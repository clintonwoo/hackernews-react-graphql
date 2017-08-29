/**  
   * WARNING: THIS USES THE REAL SCHEMA AND DATABASE!
   *
   *   Take care not to cause data loss but the app should be secure
   */

// TODO: Can make this graphql server part of the main server using feature flag
// Example GraphiQL server https://github.com/graphql/graphiql/tree/master/example

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import Schema from './Schema';
import { HOST_NAME, APP_PORT } from '../config';

const logger = console; // global.logger;

const app = express();
// app.use(morgan('dev'));

// Mount GraphQL Server middleware
app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
  schema: Schema,
  rootValue: { request },
  debug: true,
})));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(APP_PORT, () => {
  logger.info(`==> 📈 GraphQL Server on http://${HOST_NAME}:${APP_PORT}/graphql`);
  logger.info(`==> 🌎  Go to http://${HOST_NAME}:${APP_PORT}`);
});
