// import { find, filter } from 'lodash';
import {
  GraphQLScalarType,
} from 'graphql';
import {
  Kind,
} from 'graphql/language';
import {
  makeExecutableSchema,
} from 'graphql-tools';
import {
  getNewsItems,
  getNewsItem,
  upvoteNewsItem,
  downvoteNewsItem,
  getUser,
  getUsers,
  createUser,
} from './Database';

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
    creationTime: Date
    # The ID of the comment submitter
    commenterId: String!
    text: String
    upvotes: [Int]
    upvoteCount: Int
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
    HOT
  
    # Newest entries first
    NEW
  
    # Highest score entries first
    TOP
  }

  # this schema allows the following mutation:
  type Mutation {
    upvoteNewsItem (
      postId: Int!
    ): NewsItem
  }
`;

const resolvers = {
  Query: {
    feed(root, { type, first, skip }, context) {
      // Could maybe put this constant limit of 30 items into config
      const limit = (first < 1 || first > 30) ? 30 : first;
      return context.Feed.getForType(type, limit, skip);
    },

    me: (_, __, context) => context.userId && getUser(context.userId),

    newsItem: (_, { id }) => getNewsItem(id),
    // getNewsItems().sort((a, b) => (a.rank - b.rank)),

    user: (_, { id }) => getUser(id),
  },
  Mutation: {
    upvoteNewsItem: (_, { postId }) => {
      const post = getNewsItem(postId);
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.upvoteCount += 1;
      return post;
    },
  },
  User: {
    posts: author => getNewsItems().filter(newsItem => newsItem.submitterId === author.id), //filter(posts, { authorId: author.id }),
  },
  NewsItem: {
    author: newsItem => getUser(newsItem.submitterId),
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
