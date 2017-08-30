// import { find, filter } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
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
  type Comment {
    id: Int!
    commenterId: String!
    text: String
    creationTime: String
    upvotes: [Int]
    upvoteCount: Int
  }
  
  type NewsItem {
    id: Int!
    submitterId: String!
    author: User
    creationTime: String
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
    creationTime: String
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
    newsItems: () => getNewsItems(),
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
