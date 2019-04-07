// /**
//  * WARNING: THIS USES THE REAL SCHEMA AND DATABASE!
//  *
//  *   Take care not to cause data loss but the app should be secure
//  */

// // TODO: Can make this graphql server part of the main server using feature flag
// // Example GraphiQL server https://github.com/graphql/graphiql/tree/master/example

// import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
// import * as bodyParser from 'body-parser';
// import * as express from 'express';
// import { Comment, FeedSingleton, NewsItem, User } from './models';
// import { schema } from './schema';
// import { APP_PORT, GRAPHIQL_URL, graphiQLPath, GRAPHQL_URL, graphQLPath } from '../config';

// const logger = console;

// const app = express();

// // Mount GraphQL Server middleware
// app.use(
//   graphQLPath,
//   bodyParser.json(),
//   graphqlExpress(request => ({
//     schema,
//     rootValue: { request },
//     context: {
//       Comment,
//       Feed: FeedSingleton,
//       NewsItem,
//       User,
//     },
//     debug: true,
//   }))
// );

// app.use(
//   graphiQLPath,
//   graphiqlExpress({
//     endpointURL: graphQLPath,
//   })
// );

// app.listen(APP_PORT, () => {
//   logger.info(`==> 📈 GraphQL Server on ${GRAPHQL_URL}`);
//   logger.info(`==> 🌎  Go to ${GRAPHIQL_URL}`);
// });
