/** True if the app is running on the server, false if running on the client */
export const IS_SERVER = typeof window === 'undefined';

/* SERVER CONFIG */
export const graphQLPath = '/graphql';
export const graphiQLPath = '/graphiql';

export const dev = process.env.NODE_ENV !== 'production';
export const appPath = process.env.NODE_ENV === 'production' ? './dist' : './src';

export const HN_DB_URI = process.env.DB_URI || 'https://hacker-news.firebaseio.com';
export const HN_API_VERSION = process.env.HN_API_VERSION || '/v0';
export const HN_API_URL = process.env.HN_API_URL || `${HN_DB_URI}${HN_API_VERSION}`;

export const BACK_END_PORT = process.env.APP_PORT || 1500;
export const BACK_END_HOST_NAME = (!IS_SERVER && window.location.hostname) || 'localhost';

export const APP_HOST_NAME = process.env.HOST_NAME || 'localhost';
export const APP_HOST = (!IS_SERVER && window.location.host) || `${APP_HOST_NAME}:${BACK_END_PORT}`;

/** URI for where the app is running */
export const APP_URI = `http://${APP_HOST}`;

/** URI for the back end with authentication and GraphQL endpoints */
export const BACK_END_URI = `http://${BACK_END_HOST_NAME}:${BACK_END_PORT}`;
export const GRAPHQL_URL = `${BACK_END_URI}${graphQLPath}`;
export const GRAPHIQL_URL = `${BACK_END_URI}${graphiQLPath}`;
export const useGraphqlPlayground = true;

/*
  Cryptography
  https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
*/
export const passwordIterations = 10000;

/* UI CONFIG */
export const POSTS_PER_PAGE = 30;
