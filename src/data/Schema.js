import {
  GraphQLScalarType,
} from 'graphql';
import {
  Kind,
} from 'graphql/language';
import {
  makeExecutableSchema,
} from 'graphql-tools';
import debug from 'debug';

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

const logger = debug('app:Schema');
logger.log = console.log.bind(console);

/*
  Schema properties are in following order:
    Alphabetical
    Resolved fields (requires extra db work)

  Comments are provided when property is not obvious
*/
const typeDefs = `

  type Comment {
    id: Int!

    creationTime: Date!

    comments: [Comment]!

    # The ID of the item to which the comment was made on
    parent: Int!

    # The ID of the user who submitted the comment
    submitterId: String!

    text: String

    # Whether the currently logged in user has upvoted the comment
    upvoted: Boolean!

    # The User who submitted the comment
    author: User
  }

  scalar Date

  # A list of options for the sort order of the feed
  enum FeedType {
    # Sort by a combination of freshness and score, using an algorithm (Could use Reddit's)
    TOP
  
    # Newest entries first
    NEW

    # Sort by score
    BEST

    # SHOW HN articles
    SHOW

    # ASK HN articles
    ASK

    # Job listings
    JOB
  }
  
  type NewsItem {

    id: Int!

    comments: [Comment]!

    commentCount: Int!

    creationTime: Date!

    # List of user ids who have hidden this post
    hides: [String]!

    # Whether the currently logged in user has hidden the post
    hidden: Boolean!

    # The ID of the news item submitter
    submitterId: String!

    # The news item headline
    title: String!

    text: String

    # Whether the currently logged in user has upvoted the post
    upvoted: Boolean!

    upvotes: [String]!

    upvoteCount: Int!

    url: String

    # Fetches the author based on submitterId
    author: User
  }

  type User {
    # The user ID is a string of the username
    id: String!

    about: String

    creationTime: Date!

    dateOfBirth: Date

    email: String

    favorites: [Int]

    firstName: String

    hides: [Int]!

    karma: Int!

    lastName: String

    likes: [Int]!
    
    posts: [Int]!
  }

  # the schema allows the following queries:
  type Query {
    # A comment, it's parent could be another comment or a news item.
    comment(id: Int!): Comment

    feed(
      # The sort order for the feed
      type: FeedType!,

      # The number of items to fetch (starting from the skip index), for pagination
      first: Int

      # The number of items to skip, for pagination
      skip: Int,    
    ): [NewsItem]

    # The currently logged in user or null if not logged in
    me: User

    # A news item
    newsItem(id: Int!): NewsItem

    # A user
    user(id: String!): User
  }

  # This schema allows the following mutations:
  type Mutation {
    upvoteNewsItem (
      id: Int!
    ): NewsItem

    hideNewsItem (
      id: Int!
    ): NewsItem

    submitNewsItem (
      title: String!
      url: String
      text: String
    ): NewsItem
  }

`;

export const resolvers = {

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
    comment: (_, { id }, context) => context.Comment.getComment(id),

    feed(root, { type, first, skip }, context) {
      // Could put this constant limit of 30 items into config
      const limit = (first < 1 || first > 30) ? 30 : first;
      return context.Feed.getForType(type, limit, skip);
    },

    me: (_, __, context) => {
      logger('Me: userId:', context.userId);
      return context.userId && context.User.getUser(context.userId);
    },

    newsItem: (_, { id }, context) => context.NewsItem.getNewsItem(id),

    user: (_, { id }, context) => context.User.getUser(id),
  },

  /*       MUTATION RESOLVERS       */


  Mutation: {
    upvoteNewsItem: (_, { id }, context) => {
      if (!context.userId) throw new Error('Must be logged in to vote.');
      return context.NewsItem.upvoteNewsItem(id, context.userId);
    },

    hideNewsItem: (_, { id }, context) => {
      if (!context.userId) throw new Error('Must be logged in to hide post.');
      return context.NewsItem.hideNewsItem(id, context.userId);
    },

    submitNewsItem: (_, newsItem, context) => {
      if (!context.userId) throw new Error('Must be logged in to submit a news item.');
      return context.NewsItem.submitNewsItem({ ...newsItem, submitterId: context.userId });
    },
  },

  /*       GRAPHQL TYPE RESOLVERS        */


  Comment: {
    author: (comment, _, context) => context.User.getUser(comment.submitterId),
    comments: (comment, _, context) => context.Comment.getComments(comment.comments),
    upvoted: (comment, _, context) => comment.upvotes.includes(context.userId),
  },

  Date: new GraphQLScalarType({
    // http://dev.apollodata.com/tools/graphql-tools/scalars.html#Date-as-a-scalar
    name: 'Date',
    description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
    parseValue(value) {
      // Turn an input into a date which we want as a number
      // value from the client
      return new Date(value).valueOf();
    },
    serialize(value) {
      // Convert Date to number primitive .getTime() or .valueOf()
      // value sent to the client
      if (value instanceof Date) return value.valueOf();
      return value;
    },
    parseLiteral(ast) {
      // ast value is always in string format
      if (ast.kind === Kind.INT) {
        // parseInt turns a string number into number of a certain base
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),

  NewsItem: {
    author: (newsItem, _, context) => context.User.getUser(newsItem.submitterId),
    comments: (newsItem, _, context) => context.Comment.getComments(newsItem.comments),
    hidden: (newsItem, _, context) => newsItem.hides.includes(context.userId),
    upvoted: (newsItem, _, context) => newsItem.upvotes.includes(context.userId),
  },

  User: {
    posts: (user, _, context) => context.User.getPostsForUser(user.id),
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Example query
// query {
//   feed(type: 'TOP', first: 30, skip: 0) {
//     id
//     submitterId
//     author {
//       id
//       email
//     }
//     url
//     title
//     text
//     comments {
//       id
//     }
//     commentCount
//     upvotes
//     upvoteCount
//     rank
//   }
// }
