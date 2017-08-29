import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

const express = require('express');
const next = require('next');
const passport = require('passport');

const graphQLHTTP = require('express-graphql');
const bodyParser = require('body-parser');
import Schema from './data/Schema';

const config = require('./config');

const app = next({ dir: config.appPath, dev: config.dev });


const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // server.use('/graphql', graphQLHTTP(request => ({
    //   schema: Schema,
    //   pretty: true,
    //   rootValue: { request }, // In this example, only the user ID is serialized to the session, keeping the amount of data stored within the session small. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.
    // })));
    server.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
      schema: Schema,
      rootValue: { request },
      debug: true,
    })));

    server.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
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

    server.listen(config.APP_PORT, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
      console.log('> GraphQL Ready on http://localhost:3000/graphql');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

export default app;
