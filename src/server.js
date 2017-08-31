import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import express from 'express';
import next from 'next';
import passport from 'passport';

import bodyParser from 'body-parser';
import Schema from './data/Schema';

import {
  appPath,
  APP_PORT,
  APP_URI,
  graphQLPath,
  graphiQLPath,
  GRAPHQL_URL,
  dev,
} from './config';

const app = next({ dir: appPath, dev: dev });


const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(graphQLPath, bodyParser.json(), graphqlExpress(request => ({
      schema: Schema,
      rootValue: { request }, // In this example, only the user ID is serialized to the session, keeping the amount of data stored within the session small. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.
      debug: true,
    })));

    server.use(graphiQLPath, graphiqlExpress({
      endpointURL: graphQLPath,
    }));


    // server.use('assets', express.static('../assets'));

    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    /* BEGIN PASSPORT.JS AUTHENTICATION */

    server.post('/login', passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/login',
      },
    ));
    server.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    /* END PASSPORT.JS AUTHENTICATION */

    server.get('/news', (req, res) => {
      const actualPage = '/';
      app.render(req, res, actualPage);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(APP_PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${APP_URI}`);
      console.log(`> GraphQL Ready on ${GRAPHQL_URL}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

export default app;
