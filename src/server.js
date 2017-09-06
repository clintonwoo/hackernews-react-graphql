const dotenv = require('dotenv').config();
// import dotenv from 'dotenv/config'; is bugged and can't be inspected

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import next from 'next';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';

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
import seed from './data/HNDataAPI';
import {
  getUser,
} from './data/Database';
import {
  Feed,
} from './data/models';

console.log(`Dev: ${dev}`);


// Populate the in-memory data using the HN api
seed();

const app = next({ dir: appPath, dev });

const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    /* BEGIN PASSPORT.JS AUTHENTICATION */

    // passport.use(new LocalStrategy(
    //   (username, password, done) => {
    //     User.findOne({ username }, (err, user) => {
    //       if (err) { return done(err); }
    //       if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //       }
    //       if (!user.validPassword(password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //       }
    //       return done(null, user);
    //     });
    //   }
    // ));

    /*
      In this example, only the user ID is serialized to the session,
      keeping the amount of data stored within the session small. When
      subsequent requests are received, this ID is used to find the user,
      which will be restored to req.user.
    */
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser(async (id, cb) => {
      const user = await getUser(id);
      cb(null, user);
    });
    server.use(cookieParser());
    server.use(session({
      secret: 'mysecret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true },
    }));
    server.use(passport.initialize());
    server.use(passport.session());

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

    /* BEGIN GRAPHQL */

    server.use(graphQLPath, bodyParser.json(), graphqlExpress(
      req => ({
        schema: Schema,
        rootValue: { req },
        context: {
          // user,
          Feed: new Feed(),
          userId: req.user,
        },
        debug: dev,
      })),
    );

    server.use(graphiQLPath, graphiqlExpress({
      endpointURL: graphQLPath,
    }));

    /* END GRAPHQL */

    /* BEGIN EXPRESS ROUTES */

    // server.use('assets', express.static('../assets'));

    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    server.get('/news', (req, res) => {
      const actualPage = '/';
      app.render(req, res, actualPage);
    });

    server.get('*', (req, res) => handle(req, res));

    /* END EXPRESS ROUTES */

    server.listen(APP_PORT, (err) => {
      if (err) throw err;
      console.log('> Environment by .env:');
      console.log(dotenv);
      console.log(`> Ready on ${APP_URI}`);
      console.log(`> GraphQL Ready on ${GRAPHQL_URL}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

export default app;
