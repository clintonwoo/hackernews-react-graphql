/**  
   * WARNING: THIS USES THE REAL SCHEMA AND DATABASE!
   *
   *   Take care not to cause data loss but the app should be secure
   */

// TODO: Can make this graphql server part of the main server using feature flag
// Example GraphiQL server https://github.com/graphql/graphiql/tree/master/example

import express from 'express';
import bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';

import Schema from './Schema';
import {
  APP_PORT,
  graphQLPath,
  graphiQLPath,
  GRAPHQL_URL,
  GRAPHIQL_URL,
} from '../config';
import {
  Comment,
  Feed,
  NewsItem,
  User,
} from './Models';


const logger = console;

const app = express();

// Mount GraphQL Server middleware
app.use(graphQLPath, bodyParser.json(), graphqlExpress(request => ({
  schema: Schema,
  rootValue: { request },
  context: {
    Comment,
    Feed,
    NewsItem,
    User,
  },
  debug: true,
})));

app.use(graphiQLPath, graphiqlExpress({
  endpointURL: graphQLPath,
}));

app.listen(APP_PORT, () => {
  logger.info(`==> 📈 GraphQL Server on ${GRAPHQL_URL}`);
  logger.info(`==> 🌎  Go to ${GRAPHIQL_URL}`);
});
