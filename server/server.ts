import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';

import {
  BACK_END_PORT,
  dev,
  graphQLPath,
  GRAPHQL_URL,
  useGraphqlPlayground,
  BACK_END_URI,
} from '../src/config';
import { UserModel } from '../src/data/models';
import { typeDefs } from './graphql-schema';
import { resolvers, IGraphQlSchemaContext } from './graphql-resolvers';
import { seedCache, warmCache } from './database/cache-warmer';
import { CommentService, FeedService, NewsItemService, UserService } from './services';

const ONE_MINUTE = 1000 * 60;
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

// Seed the in-memory data using the HN api
const delay = dev ? ONE_MINUTE : 0;
seedCache(delay);

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
passport.deserializeUser((id: string, cb) => {
  (async (): Promise<void> => {
    const user = await UserService.getUser(id);

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

const apolloServer = new ApolloServer({
  context: ({ req }): IGraphQlSchemaContext => ({
    CommentService,
    FeedService,
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

expressServer.listen(BACK_END_PORT, () => {
  console.log(`> Server ready on ${BACK_END_URI}`);
  console.log(`> GraphQL ready on ${GRAPHQL_URL}`);
  console.log(`> GraphQL Playground is${useGraphqlPlayground ? ' ' : ' not '}enabled`);
  console.log(`Dev: ${dev}`);
});

warmCache();
