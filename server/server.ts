import { ApolloServer } from 'apollo-server-express';
import { urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import nextApp from 'next';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { parse } from 'url';
import dotenv from 'dotenv';

dotenv.config();
/* eslint-disable import/first */

import {
  APP_PORT,
  dev,
  GRAPHQL_PATH,
  HN_API_VERSION,
  HN_DB_URI,
  useGraphqlPlayground,
} from '../src/config';
import { UserModel } from '../src/data/models';
import { HnCache } from './database/cache';
import { seedCache, warmCache } from './database/cache-warmer';
import { HnDatabase } from './database/database';
import { IGraphQlSchemaContext, resolvers } from './graphql-resolvers';
import { typeDefs } from './graphql-schema';
import { CommentService } from './services/comment-service';
import { FeedService } from './services/feed-service';
import { NewsItemService } from './services/news-item-service';
import { UserService } from './services/user-service';
import { ServerResponse } from 'http';

const ONE_MINUTE = 1000 * 60;
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

// Seed the in-memory data using the HN api
const delay = dev ? ONE_MINUTE : 0;

const app = nextApp({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const firebaseApp = initializeApp({ databaseURL: HN_DB_URI });
    const firebaseDb = getDatabase(firebaseApp); //Firebase.database().ref(HN_API_VERSION);
    const firebaseRef = ref(firebaseDb, HN_API_VERSION);

    const cache = new HnCache();
    const db = new HnDatabase(firebaseRef, cache);
    seedCache(db, cache, delay);

    const commentService = new CommentService(db, cache);
    const feedService = new FeedService(db, cache);
    const newsItemService = new NewsItemService(db, cache);
    const userService = new UserService(db, cache);

    const expressServer = express();

    /* BEGIN PASSPORT.JS AUTHENTICATION */

    passport.use(
      new (Strategy as any)(
        {
          usernameField: 'id',
        },
        async (username, password, done) => {
          const user = await userService.getUser(username);
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }

          if (!(await userService.validatePassword(username, password))) {
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
    passport.serializeUser((user: unknown, cb) => {
      cb(null, (user as UserModel).id);
    });
    passport.deserializeUser((id: string, cb) => {
      (async (): Promise<void> => {
        const user = await userService.getUser(id);

        cb(null, user || null);
      })();
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
    expressServer.use(urlencoded({ extended: false }) as express.Handler);
    expressServer.use(passport.session());

    expressServer.post(
      '/login',
      (req, res, next) => {
        // @ts-ignore returnTo is an undocumented feature of passportjs
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
            await userService.registerUser({
              id: req.body.id,
              password: req.body.password,
            });
            // @ts-ignore returnTo is an undocumented feature of passportjs
            req.session!.returnTo = `/user?id=${req.body.id}`;
          } catch (err) {
            // @ts-ignore returnTo is an undocumented feature of passportjs
            req.session!.returnTo = `/login?how=${err.code}`;
          }
        } else {
          // @ts-ignore returnTo is an undocumented feature of passportjs
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

    const apolloServer = new ApolloServer({
      context: ({ req }): IGraphQlSchemaContext => ({
        commentService,
        feedService,
        newsItemService,
        userService,
        userId: (req.user as UserModel)?.id,
      }),
      introspection: true,
      playground: useGraphqlPlayground,
      resolvers,
      typeDefs,
    } as any);
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: expressServer, path: GRAPHQL_PATH });

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
      void app.render(req, res as ServerResponse, actualPage);
    });

    expressServer.get('*', (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);

      void handle(req, res as ServerResponse, parsedUrl);
    });

    /* END EXPRESS ROUTES */

    warmCache(db, cache, feedService);

    expressServer.listen(APP_PORT, () => {
      console.log(`> App listening on port ${APP_PORT}`);
      console.log(`> GraphQL ready on ${GRAPHQL_PATH}`);
      console.log(`> GraphQL Playground is ${useGraphqlPlayground ? '' : 'not '}enabled`);
      console.log(`Dev: ${String(dev)}`);
    });
  })
  .catch((err) => {
    console.error((err as Error).stack);
    process.exit(1);
  });
