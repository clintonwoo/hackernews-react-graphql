import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as nextApp from 'next';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
// import {
//   graphqlExpress,
//   graphiqlExpress,
// } from 'apollo-server-express';

import { schema } from './data/schema';
import { seedCache } from './data/hn-data-api';
import { Comment, FeedSingleton, NewsItem, User } from './data/models';
import { appPath, APP_PORT, APP_URI, graphQLPath, graphiQLPath, GRAPHQL_URL, dev } from './config';

// Seed the in-memory data using the HN api
const delay = dev ? /* 1000 * 60 * 1  1 minute */ 0 : 0;
seedCache(delay);

const app = nextApp({ dir: appPath, dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const expressServer = express();

    /* BEGIN PASSPORT.JS AUTHENTICATION */

    passport.use(
      new LocalStrategy(
        {
          usernameField: 'id',
        },
        async (username, password, done) => {
          const user = await User.getUser(username);
          // if (err) return done(err);
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!(await User.validPassword(username, password))) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        }
      )
    );

    /*
      In this example, only the user ID is serialized to the session,
      keeping the amount of data stored within the session small. When
      subsequent requests are received, this ID is used to find the user,
      which will be restored to req.user.
    */
    passport.serializeUser((user: any /* TODO: TYPE */, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser(async (id, cb) => {
      const user = await User.getUser(id);
      cb(null, user || null);
    });
    expressServer.use(cookieParser('mysecret'));
    expressServer.use(
      session({
        secret: 'mysecret',
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // Requires https: secure: false
      })
    );
    expressServer.use(passport.initialize());
    expressServer.use(bodyParser.urlencoded({ extended: false }));
    expressServer.use(passport.session());

    expressServer.post(
      '/login',
      (req, res, next) => {
        req.session.returnTo = req.body.goto;
        next();
      },
      passport.authenticate('local', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login?how=unsuccessful',
      })
    );
    expressServer.post(
      '/register',
      async (req, res, next) => {
        if (!req.user) {
          try {
            await User.registerUser({
              id: req.body.id,
              password: req.body.password,
            });
            req.session.returnTo = `/user?id=${req.body.id}`;
          } catch (err) {
            req.session.returnTo = `/login?how=${err.code}`;
          }
        } else req.session.returnTo = '/login?how=user';
        next();
      },
      passport.authenticate('local', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login?how=unsuccessful',
      })
    );
    expressServer.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    /* END PASSPORT.JS AUTHENTICATION */

    /* BEGIN GRAPHQL */

    const apolloServer = new ApolloServer({
      schema,
      context: {
        Feed: FeedSingleton,
        NewsItem,
        Comment,
        User,
        userId,
      },
    });
    apolloServer.applyMiddleware({ app: expressServer });

    // server.use(
    //   graphQLPath,
    //   bodyParser.json(),
    //   graphqlExpress(req => {
    //     const userId = req.user && req.user.id;
    //     return {
    //       schema: Schema,
    //       rootValue: { req },
    //       context: {
    //         Feed: FeedSingleton,
    //         NewsItem,
    //         Comment,
    //         User,
    //         userId,
    //       },
    //       debug: dev,
    //     };
    //   })
    // );

    // server.use(
    //   graphiQLPath,
    //   graphiqlExpress({
    //     endpointURL: graphQLPath,
    //   })
    // );

    /* END GRAPHQL */

    /* BEGIN EXPRESS ROUTES */

    // This is how to render a masked route with NextJS
    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    expressServer.get('/news', (req, res) => {
      const actualPage = '/';
      app.render(req, res, actualPage);
    });

    expressServer.get('*', (req, res) => handle(req, res));

    /* END EXPRESS ROUTES */

    expressServer.listen(APP_PORT, err => {
      if (err) throw err;
      console.log(`> App ready on ${APP_URI}`);
      console.log(`> GraphQL Ready on ${GRAPHQL_URL}`);
      console.log(`Dev: ${dev}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

export default app;
