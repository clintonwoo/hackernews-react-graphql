import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { debug } from 'debug';
import * as fetch from 'isomorphic-fetch';

import { GRAPHQL_URL } from '../config';

const logger = debug('app:initApollo');
logger.log = console.log.bind(console);

let apolloClient = null;

declare let global;

// Polyfill fetch() on the server (used by apollo-client)
if (!(process as any).browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  return new ApolloClient({
    ssrMode: !(process as any).browser, // Disables forceFetch on the server (so queries are only run once)
    link: createHttpLink({
      uri: GRAPHQL_URL,
      credentials: 'same-origin',
      headers: {
        // HTTP Header:  Cookie: <cookiename>=<cookievalue>
        Cookie: `connect.sid=${getToken()['connect.sid']}`,
      },
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: (process as any).browser,
  });
}

export function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!(process as any).browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
