export const graphQLPath = '/graphql';
export const graphiQLPath = '/graphiql';

export const dev = process.env.NODE_ENV !== 'production';
export const appPath = process.env.NODE_ENV === 'production' ? './src' : './src';

export const DB_URI = process.env.DB_URI || '';
export const HOST_NAME = process.env.HOST_NAME || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;

export const APP_URI = `http://${HOST_NAME}:${APP_PORT}`;
export const GRAPHQL_URL = `${APP_URI}${graphQLPath}`;
export const GRAPHIQL_URL = `${APP_URI}${graphiQLPath}`;

console.log(`Dev: ${dev}`);