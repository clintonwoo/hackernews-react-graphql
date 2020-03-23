import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import nextApp from 'next';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { parse } from 'url';
import qsMiddleware from 'qs-middleware';

import { UserModel, FeedType } from '../src/data/models';
import { resolvers, typeDefs } from '../src/data/schema';
import { seedCache } from './database/hn-data-api';
import { CommentService, NewsItemService, FeedSingleton, UserService } from './services';
import { APP_PORT, APP_URI, dev, GRAPHQL_URL, graphQLPath, useGraphqlPlayground } from './config';

const FIFTEEN_MINUTES = 1000 * 60 * 15;
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

// Seed the in-memory data using the HN api
const delay = dev ? /* 1000 * 60 * 1  1 minute */ 0 : 0;
seedCache(delay);

const app = nextApp({ dev: true });
const handle = app.getRequestHandler();

function warmCache(): void {
  // Fetch the front pages
  FeedSingleton.getForType(FeedType.TOP, 30, 0);
  FeedSingleton.getForType(FeedType.NEW, 30, 0);

  setTimeout(warmCache, FIFTEEN_MINUTES);
}

app
  .prepare()
  .then(() => {
    const expressServer = express();

    /* BEGIN PASSPORT.JS AUTHENTICATION */

    passport.use(
      new (Strategy as any)(
        {
          usernameField: 'id',
        },
        async (username, password, done) => {
          const user = await UserService.getUser(username);
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }

          if (!(await UserService.validatePassword(username, password))) {
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
    passport.serializeUser((user: UserModel, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser(async (id: string, cb) => {
      const user = await UserService.getUser(id);
      cb(null, user || null);
    });

    expressServer.use(cookieParser('mysecret'));
    expressServer.use(
      session({
        cookie: { maxAge: SEVEN_DAYS }, // Requires https: secure: false
        resave: false,
        rolling: true,
        saveUninitialized: false,
        secret: 'mysecret',
      })
    );
    expressServer.use(passport.initialize());
    expressServer.use(bodyParser.urlencoded({ extended: false }));
    expressServer.use(passport.session());

    expressServer.post(
      '/login',
      (req, res, next) => {
        req.session!.returnTo = req.body.goto;
        next();
      },
      passport.authenticate('local', {
        failureRedirect: '/login?how=unsuccessful',
        successReturnToOrRedirect: '/',
      })
    );
    expressServer.post(
      '/register',
      async (req, res, next) => {
        if (!req.user) {
          try {
            await UserService.registerUser({
              id: req.body.id,
              password: req.body.password,
            });
            req.session!.returnTo = `/user?id=${req.body.id}`;
          } catch (err) {
            req.session!.returnTo = `/login?how=${err.code}`;
          }
        } else {
          req.session!.returnTo = '/login?how=user';
        }
        next();
      },
      passport.authenticate('local', {
        failureRedirect: '/login?how=unsuccessful',
        successReturnToOrRedirect: '/',
      })
    );
    expressServer.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    /* END PASSPORT.JS AUTHENTICATION */

    /* BEGIN GRAPHQL */

    expressServer.use(qsMiddleware());

    const apolloServer = new ApolloServer({
      context: ({ req }) => ({
        CommentService,
        FeedSingleton,
        NewsItemService,
        UserService,
        userId: (req.user as UserModel)?.id,
      }),
      introspection: true,
      playground: useGraphqlPlayground,
      resolvers,
      typeDefs,
    } as any);
    apolloServer.applyMiddleware({ app: expressServer, path: graphQLPath });

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

    expressServer.get('*', (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      handle(req, res, parsedUrl);
    });

    /* END EXPRESS ROUTES */

    expressServer.listen(APP_PORT, () => {
      console.log(`> App ready on ${APP_URI}`);
      console.log(`> GraphQL ready on ${GRAPHQL_URL}`);
      console.log(`> GraphQL Playground is${useGraphqlPlayground ? ' ' : ' not '}enabled`);
      console.log(`Dev: ${dev}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

warmCache();

export default app;
