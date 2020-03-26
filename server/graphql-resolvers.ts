import { debug } from 'debug';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { IResolvers } from 'graphql-tools';

import { NewsItemModel, CommentModel, UserModel } from '../src/data/models';
import { CommentService, FeedService, NewsItemService, UserService } from './services';

const logger = debug('app:Graphql-Resolvers');
logger.log = console.log.bind(console);

export interface IGraphQlSchemaContext {
  CommentService: typeof CommentService;
  FeedService: typeof FeedService;
  NewsItemService: typeof NewsItemService;
  UserService: typeof UserService;
  userId: string | undefined;
}

export const resolvers: IResolvers<any, IGraphQlSchemaContext> = {
  /*
    http://dev.apollodata.com/tools/graphql-tools/resolvers.html
    
    Resolver function signature:
      fieldName(obj, args, context, info) { result }
    
    obj: The object that contains the result returned from the
      resolver on the parent field, or, in the case of a top-level
      Query field, the rootValue passed from the server configuration.
      This argument enables the nested nature of GraphQL queries.

    context: This is an object shared by all resolvers in a particular
      query, and is used to contain per-request state, including
      authentication information, dataloader instances, and anything
      else that should be taken into account when resolving the query
  */

  /*          QUERY RESOLVERS        */

  Query: {
    comment(_, { id }, context): CommentModel | Promise<void | CommentModel> {
      return context.CommentService.getComment(id);
    },

    feed(
      root,
      { type, first, skip },
      context
    ): Promise<Array<NewsItemModel | void>> | NewsItemModel[] {
      const limit = first < 1 || first > 30 ? 30 : first; // Could put this constant limit of 30 items into config

      return context.FeedService.getForType(type, limit, skip);
    },

    me(_, __, context): void | UserModel | Promise<void | UserModel> {
      logger('Me: userId:', context.userId);

      return typeof context.userId === 'string'
        ? context.UserService.getUser(context.userId)
        : undefined;
    },

    newsItem(_, { id }, context): NewsItemModel | Promise<void | NewsItemModel> {
      return context.NewsItemService.getNewsItem(id);
    },

    user(_, { id }, context): UserModel | Promise<void | UserModel> {
      return context.UserService.getUser(id);
    },
  },

  /*       MUTATION RESOLVERS       */

  Mutation: {
    upvoteNewsItem(_, { id }, context): NewsItemModel | undefined {
      if (!context.userId) throw new Error('Must be logged in to vote.');

      return context.NewsItemService.upvoteNewsItem(id, context.userId);
    },

    hideNewsItem(_, { id }, context): NewsItemModel {
      if (!context.userId) throw new Error('Must be logged in to hide post.');

      return context.NewsItemService.hideNewsItem(id, context.userId);
    },

    submitNewsItem(_, newsItem, context): NewsItemModel {
      if (!context.userId) throw new Error('Must be logged in to submit a news item.');

      return context.NewsItemService.submitNewsItem({ ...newsItem, submitterId: context.userId });
    },
  },

  /*       GRAPHQL TYPE RESOLVERS        */

  Comment: {
    author(comment, _, context): UserModel | Promise<UserModel | void> {
      return context.UserService.getUser(comment.submitterId);
    },
    comments(comment, _, context): Promise<void | CommentModel[]> {
      return context.CommentService.getComments(comment.comments);
    },
    upvoted(comment, _, context): boolean {
      return comment.upvotes.includes(context.userId);
    },
  },

  Date: new GraphQLScalarType({
    // http://dev.apollodata.com/tools/graphql-tools/scalars.html#Date-as-a-scalar
    name: 'Date',
    description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
    parseValue(value): number {
      // Turn an input into a date which we want as a number
      // value from the client
      return new Date(value).valueOf();
    },
    serialize(value): number {
      // Convert Date to number primitive .getTime() or .valueOf()
      // value sent to the client
      return value instanceof Date ? value.valueOf() : value;
    },
    parseLiteral(ast): number | null {
      // ast value is always in string format
      // parseInt turns a string number into number of a certain base
      return ast.kind === Kind.INT ? parseInt(ast.value, 10) : null;
    },
  }),

  NewsItem: {
    author(newsItem, _, context): UserModel | Promise<UserModel | void> {
      return context.UserService.getUser(newsItem.submitterId);
    },
    comments(newsItem, _, context): Promise<CommentModel[] | void> {
      return context.CommentService.getComments(newsItem.comments);
    },
    hidden(newsItem: NewsItemModel, _, context): boolean {
      return newsItem.hides.includes(context.userId!);
    },
    upvoted(newsItem: NewsItemModel, _, context): boolean {
      return newsItem.upvotes.includes(context.userId);
    },
  },

  User: {
    posts(user, _, context): NewsItemModel[] {
      return context.UserService.getPostsForUser(user.id);
    },
  },
};
