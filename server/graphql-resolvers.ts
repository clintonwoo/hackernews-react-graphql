import { debug } from 'debug';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import type { IResolvers } from '@graphql-tools/utils';

import { NewsItemModel, CommentModel, UserModel } from '../src/data/models';
import type { CommentService } from './services/comment-service';
import type { FeedService } from './services/feed-service';
import type { NewsItemService } from './services/news-item-service';
import type { UserService } from './services/user-service';

const logger = debug('app:Graphql-Resolvers');
logger.log = console.log.bind(console);

export interface IGraphQlSchemaContext {
  commentService: CommentService;
  feedService: FeedService;
  newsItemService: NewsItemService;
  userService: UserService;
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
    async comment(_, { id }, context): Promise<CommentModel | void> {
      return context.commentService.getComment(id);
    },

    async feed(root, { type, first, skip }, context): Promise<(NewsItemModel | void)[]> {
      const limit = first < 1 || first > 30 ? 30 : first; // Could put this constant limit of 30 items into config

      return context.feedService.getForType(type, limit, skip);
    },

    async me(_, __, context): Promise<UserModel | void> {
      logger('Me: userId:', context.userId);

      return typeof context.userId === 'string'
        ? context.userService.getUser(context.userId)
        : undefined;
    },

    async newsItem(_, { id }, context): Promise<NewsItemModel | void> {
      return context.newsItemService.getNewsItem(id);
    },

    async user(_, { id }, context): Promise<UserModel | void> {
      return context.userService.getUser(id);
    },
  },

  /*       MUTATION RESOLVERS       */

  Mutation: {
    async upvoteNewsItem(_, { id }, context): Promise<NewsItemModel | undefined> {
      if (!context.userId) throw new Error('Must be logged in to vote.');

      return context.newsItemService.upvoteNewsItem(id, context.userId);
    },

    async hideNewsItem(_, { id }, context): Promise<NewsItemModel> {
      if (!context.userId) throw new Error('Must be logged in to hide post.');

      return context.newsItemService.hideNewsItem(id, context.userId);
    },

    async submitNewsItem(_, newsItem, context): Promise<NewsItemModel> {
      if (!context.userId) throw new Error('Must be logged in to submit a news item.');

      return context.newsItemService.submitNewsItem({ ...newsItem, submitterId: context.userId });
    },
  },

  /*       GRAPHQL TYPE RESOLVERS        */

  Comment: {
    async author(comment, _, context): Promise<UserModel | void> {
      return context.userService.getUser(comment.submitterId);
    },
    async comments(comment, _, context): Promise<void | CommentModel[]> {
      return context.commentService.getComments(comment.comments);
    },
    upvoted(comment, _, context): boolean {
      return comment.upvotes.includes(context.userId);
    },
  },

  Date: new GraphQLScalarType({
    // http://dev.apollodata.com/tools/graphql-tools/scalars.html#Date-as-a-scalar
    name: 'Date',
    description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
    parseValue(value: any): number {
      // Turn an input into a date which we want as a number
      // value from the client
      return new Date(value).valueOf();
    },
    serialize(value: any): number {
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
    async author(newsItem, _, context): Promise<UserModel | void> {
      return context.userService.getUser(newsItem.submitterId);
    },
    async comments(newsItem, _, context): Promise<CommentModel[] | void> {
      return context.commentService.getComments(newsItem.comments);
    },
    hidden(newsItem: NewsItemModel, _, context): boolean {
      return newsItem.hides.includes(context.userId!);
    },
    upvoted(newsItem: NewsItemModel, _, context): boolean {
      return newsItem.upvotes.includes(context.userId);
    },
  },

  User: {
    async posts(user, _, context): Promise<NewsItemModel[]> {
      return context.userService.getPostsForUser(user.id);
    },
  },
};
