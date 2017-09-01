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

const typeDefs = `
  scalar Date 

  type Comment {
    id: Int!
    commenterId: String!
    text: String
    creationTime: Date
    upvotes: [Int]
    upvoteCount: Int
  }
  
  type NewsItem {
    id: Int!
    submitterId: String!
    author: User
    creationTime: Date
    url: String
    title: String
    text: String
    comments: [Comment]
    commentCount: Int
    upvotes: [Int]
    upvoteCount: Int
    rank: Int
    points: Int
  }

  type User {
    id: String!
    creationTime: Date
    firstName: String
    lastName: String
    email: String
    dateOfBirth: Int
    likes: [Int]
    posts: [Int]
    favorites: [Int]
  }

  # the schema allows the following queries:
  type Query {
    feed(
      # The sort order for the feed
      type: FeedType!,

      # The number of items to skip, for pagination
      skip: Int,
  
      # The number of items to fetch starting from the offset, for pagination
      first: Int
    ): [NewsItem]
    newsItems: [NewsItem]
    user(id: String!): User
    # posts: [Post]
    # author(id: Int!): Author
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
    newsItems: () => getNewsItems().sort((a, b) => (a.rank - b.rank)),
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
