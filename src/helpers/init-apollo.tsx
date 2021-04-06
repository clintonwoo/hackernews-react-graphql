import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import { ApolloClient, createHttpLink } from '@apollo/client';
import { debug } from 'debug';
import fetch from 'isomorphic-unfetch';

import { IS_SERVER, GRAPHQL_URI } from '../config';

const logger = debug('app:initApollo');
logger.log = console.log.bind(console);

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function create(initialState, { getToken }): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: !IS_SERVER, // Disables forceFetch on the server (so queries are only run once)
    link: createHttpLink({
      uri: GRAPHQL_URI,
      credentials: 'same-origin',
      headers: {
        // HTTP Header:  Cookie: <cookiename>=<cookievalue>
        Cookie: `connect.sid=${getToken()['connect.sid']}`,
      },
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: !IS_SERVER,
  });
}

export function initApollo(initialState, options): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (IS_SERVER) {
    return create(initialState, options);
  }

  // Reuse client at module scope on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
