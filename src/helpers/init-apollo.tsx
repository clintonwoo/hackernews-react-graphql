import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { debug } from 'debug';
import fetch from 'isomorphic-unfetch';

import { GRAPHQL_URL } from '../config';

const logger = debug('app:initApollo');
logger.log = console.log.bind(console);

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function create(initialState, { getToken }): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: !typeof window === undefined, // Disables forceFetch on the server (so queries are only run once)
    link: createHttpLink({
      uri: GRAPHQL_URL,
      credentials: 'same-origin',
      headers: {
        // HTTP Header:  Cookie: <cookiename>=<cookievalue>
        Cookie: `connect.sid=${getToken()['connect.sid']}`,
      },
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: !typeof window === undefined,
  });
}

export function initApollo(initialState, options): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === undefined) {
    return create(initialState, options);
  }

  // Reuse client at module scope on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
