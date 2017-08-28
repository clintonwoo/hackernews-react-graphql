// import 'babel/polyfill'

/**  
   * WARNING: THIS USES THE REAL SCHEMA AND DATABASE!
   *
   *   Take care not to cause data loss but the app should be secure
   */

// TODO: Can make this graphql server part of the main server using feature flag
// Example GraphiQL server https://github.com/graphql/graphiql/tree/master/example

import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './Schema';
import { HOST_NAME, APP_PORT } from '../config';

const logger = console; // global.logger;

const app = express();
// app.use(morgan('dev'));

// Mount GraphQL Server middleware
app.use('/graphql', graphQLHTTP(request => ({
  schema: Schema,
  pretty: true,
  graphiql: true,
  rootValue: { request },
}),
));

// Serve static resources
// https://expressjs.com/en/starter/static-files.html
// app.use(express.static(__dirname)); 
app.use('/node_modules', express.static('node_modules'));

// Serve graphiQL
app.get('/graphiql', (req, res, next) => {
  if (req.path === '/graphql') return;

  res.sendFile(path.join(__dirname, '/graphiql.html'));
});

app.listen(APP_PORT, () => {
  logger.info(`==> 📈 GraphQL Server on http://${HOST_NAME}:${APP_PORT}/graphql`);
  logger.info(`==> 🌎  Go to http://${HOST_NAME}:${APP_PORT}`);
});
