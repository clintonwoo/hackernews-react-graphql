import {
  GraphQLScalarType,
} from 'graphql';
import {
  Kind,
} from 'graphql/language';
import {
  makeExecutableSchema,
} from 'graphql-tools';

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

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

    parent: Int!

    # The ID of the user who submitted the comment
    submitterId: String!

    text: String

    # The User who submitted the comment
    author: User
  }

  scalar Date
  
  type NewsItem {

    id: Int!

    comments: [Comment]

    commentCount: Int

    creationTime: Date!

    points: Int

    rank: Int

    # The ID of the news item submitter
    submitterId: String!

    # The news item headline
    title: String!

    text: String

    upvotes: [Int]

    upvoteCount: Int

    url: String

    # Fetches the author based on submitterId
    author: User
  }

  type User {
    # The user ID is a string of the username
    id: String!

    creationTime: Date

    dateOfBirth: Date

    email: String

    favorites: [Int]

    firstName: String

    karma: Int

    lastName: String

    likes: [Int]
    
    posts: [Int]
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

  # A list of options for the sort order of the feed
  enum FeedType {
    # Sort by a combination of freshness and score, using an algorithm (Could use Reddit's)
    TOP
  
    # Newest entries first
    NEW

    # SHOW HN articles
    SHOW

    # ASK HN articles
    ASK

    # Job listings
    JOB
  }

  # this schema allows the following mutation:
  type Mutation {
    upvoteNewsItem (
      postId: Int!
    ): NewsItem
  }

`;

const resolvers = {

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
      // Could maybe put this constant limit of 30 items into config
      const limit = (first < 1 || first > 30) ? 30 : first;
      return context.Feed.getForType(type, limit, skip);
    },

    me: (_, __, context) => context.userId && context.User.getUser(context.userId),

    newsItem: (_, { id }, context) => context.NewsItem.getNewsItem(id),
    // getNewsItems().sort((a, b) => (a.rank - b.rank)),

    user: (_, { id }, context) => context.User.getUser(id),
  },

  /*       MUTATION RESOLVERS       */


  Mutation: {
    upvoteNewsItem: (_, { postId }, context) => context.NewsItem.upvoteNewsItem(postId),
  },

  /*       GRAPHQL TYPE RESOLVERS        */


  Comment: {
    author: (comment, _, context) => context.User.getUser(comment.submitterId),
    comments: (comment, _, context) => context.Comment.getComments(comment.comments),
    // 
    // comment.comments.map(commentId => context.Comment.getComment(commentId)),
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
      if (ast.kind === Kind.INT) {
        // ast value is always in string format
        // parseInt turns a string number into number of base param 2
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),

  NewsItem: {
    author: (newsItem, _, context) => context.User.getUser(newsItem.submitterId),
    comments: (newsItem, _, context) => context.Comment.getComments(newsItem.comments),
    // newsItem.comments.map(commentId => context.Comment.getComment(commentId)),
  },

  User: {
    posts: (user, _, context) => context.User.getPostsForUser(user.id),
    // getNewsItems().filter(newsItem => newsItem.submitterId === user.id),
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Example query (old)
// query {
//   newsItems {
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
//     points
//   }
// }
