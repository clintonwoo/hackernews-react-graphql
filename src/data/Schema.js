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

const newsItemSample =
    {
      id: 1224,
      creationTime: new Date(2017, 8, 21, 16, 12, 16),
      submitterId: 'hvo',
      title: '“Learning How to Learn,” the most popular course on Coursera',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      downvotes: [],
      downvoteCount: 0,
      comments: [],
      commentCount: 44,
      rank: 1,
      points: 171,
    };


const userSample =
    {
      // id: 1, // username is Primary Key
      id: 'clintonwoo', // Aka. username
      creationTime: new Date(2017, 8, 21, 16, 10, 14),
      firstName: 'Clinton',
      lastName: 'D\'Annolfo',
      dob: new Date(1992, 12, 6),
      hidden: [],
    };

const commentSample =
        {
          id: 123331,
          creationTime: new Date(2017, 8, 21, 16, 12, 20),
          commenterId: 'clintonwoo',
          text: 'I know this might come accross as bragging, but I just won the internet again.',
          upvotes: new Set([1, 2, 3, 4]),
          upvoteCount: 4,
        };

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

const typeDefs = `
  type Comment {
    id: Int!
    commenterId: Int!
    text: String
    creationTime: Int
    upvotes: [Int]
    upvoteCount: Int
  }
  
  type NewsItem {
    id: Int!
    submitterId: Int!
    author: User
    creationTime: Int
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
    creationTime: Int
    firstName: String
    lastName: String
    email: String
    dateOfBirth: Int
    likes: [Int]
    posts: [Int]
    favorites: [Int]
  }

  # the schema allows the following query:
  type Query {
    newsItems: [NewsItem]
    user(id: String!): User
    # posts: [Post]
    # author(id: Int!): Author
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

// const authors = [
//   { id: 1, firstName: 'Tom', lastName: 'Coleman' },
//   { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
//   { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
// ];

// const posts = [
//   { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
//   { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
//   { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
//   { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
// ];

// const GraphQLComment = new GraphQLObjectType({
//   name: 'Comment',
//   description: 'A comment on a news item',
//   fields: () => ({
//     id: {
//       type: GraphQLID,
//       resolve: comment => comment.id,
//     },
//     commenterId: {
//       type: GraphQLID,
//       resolve: comment => comment.commenterId,
//     },
//     text: {
//       type: GraphQLString,
//       resolve: comment => comment.text,
//     },
//     // author: {
//     //   type: GraphQLUser,
//     //   description: 'The user who wrote the comment',
//     //   // args: connectionArgs,
//     //   resolve: async comment =>
//     //     await getUser(comment.author.id), // connectionFromArray(getUser(comment.author), args),
//     // },
//     creationTime: {
//       type: GraphQLString,
//       description: 'The date and time when the comment was made',
//       resolve: comment => comment.creationTime,
//     },
//     upvotes: {
//       type: new GraphQLList(GraphQLID),
//       resolve: comment => comment.upvotes,
//     },
//     upvoteCount: {
//       type: GraphQLInt,
//       resolve: newsItem => newsItem.upvoteCount,
//     },
//     // likers: {
//     //   type: LikersConnection,
//     //   description: 'A person who likes the comment',
//     //   args: connectionArgs,
//     //   resolve: async (comment, connectionArgs) => connectionFromArray(await getUsers(comment.likers.map(liker => liker.likerId)), connectionArgs),
//     // },
//   }),
//   // interfaces: [nodeInterface], // , GraphQLCommentable],
// });

// const GraphQLNewsItem = new GraphQLObjectType({
//   name: 'NewsItem',
//   description: 'An item of factual news',
//   fields: () => ({
//     id: {
//       type: GraphQLID,
//       resolve: newsItem => newsItem.id,
//     },
//     creationTime: {
//       type: GraphQLString,
//       description: 'The date and time the news item was created',
//       resolve: newsItem => newsItem.creationTime,
//     },
//     submitterId: {
//       type: GraphQLString,
//       description: 'The ID of the author',
//       resolve: newsItem => newsItem.submitterId,
//     },
//     // author: {
//     //   type: GraphQLUser, // AuthorConnection, //nodeField
//     //   description: 'The author of the news item',
//     //   resolve: async newsItem =>
//     //     await getUser(newsItem.authorId), // connectionFromArray(getUser(newsItem.author.id), args),
//     // },
//     url: {
//       type: GraphQLString,
//       description: 'A URL to view the news item',
//       resolve: newsItem => newsItem.url,
//     },
//     title: {
//       type: GraphQLString,
//       description: 'The string format of the news',
//       resolve: newsItem => newsItem.title,
//     },
//     text: {
//       type: GraphQLString,
//       description: 'The story body text',
//       resolve: newsItem => newsItem.text,
//     },
//     // viewerDoesLike: {
//     //   type: GraphQLLikeEnum,
//     //   description: 'Whether the user has liked the news item',
//     //   resolve: (newsItem, args, info) => {
//     //     if (info.rootValue.request.user && typeof info.rootValue.request.user._id !== 'undefined') {
//     //       if (newsItem && newsItem.likers) {
//     //         logger.debug(`resolve viewerDoesLike likers ${newsItem.likers}`);
//     //         const liker = newsItem.likers.find(liker => liker.userId === info.rootValue.request.user._id);
//     //         logger.info(`newsitem ${newsItem} \nliker ${liker}`);
//     //         if (liker) { return liker.like; }
//     //       }
//     //     }
//     //     return 'NONE';// LikeEnum.NONE
//     //   },
//     // },
//     comments: {
//       type: new GraphQLList(GraphQLComment),
//       resolve: newsItem => newsItem.comments,
//     },
//     commentCount: {
//       type: GraphQLInt,
//       resolve: newsItem => newsItem.commentCount,
//     },
//     // likers: {
//     //   type: LikersConnection,
//     //   description: 'A person who likes the news item',
//     //   args: connectionArgs,
//     //   resolve: async (newsItem, connectionArgs) => connectionFromArray(await getUsers(newsItem.likers.map(liker => liker.likerId)), connectionArgs),
//     // },
//     upvotes: {
//       type: new GraphQLList(GraphQLID),
//       resolve: newsItem => newsItem.upvotes,
//     },
//     upvoteCount: {
//       type: GraphQLInt,
//       resolve: newsItem => newsItem.upvoteCount,
//     },
//     rank: {
//       type: GraphQLInt,
//       description: 'The rank of the post',
//       resolve: newsItem => newsItem.rank,
//     },
//     points: {
//       type: GraphQLInt,
//       description: 'The current score for the post',
//       resolve: newsItem => newsItem.points,
//     },
//   }),
//   // interfaces: [nodeInterface],
// });

// const GraphQLUser = new GraphQLObjectType({
//   name: 'User',
//   description: 'A user of Fact Based News',
//   // interfaces: [nodeInterface, GraphQLCreatedAtInterface],
//   fields: () => ({
//     id: {
//       type: GraphQLID,
//       resolve: user => user.id,
//     },
//     creationTime: {
//       type: GraphQLString,
//       description: 'The date the object was created',
//       resolve: user => user.creationTime,
//     },
//     firstName: {
//       type: GraphQLString,
//       description: "The user's first name",
//       resolve: user => user.firstName,
//     },
//     lastName: {
//       type: GraphQLString,
//       description: "The user's last name",
//       resolve: user => user.lastName,
//     },
//     email: {
//       type: GraphQLString,
//       description: "The user's email address",
//       resolve: user => user.email,
//     },
//     // services: {
//     //   type: GraphQLUserServices,
//     //   description: 'Service information about the user',
//     //   resolve: user => user.services,
//     // },
//     dateOfBirth: {
//       type: GraphQLString,
//       description: "The user's birth day",
//       resolve: user => user.dateOfBirth,
//     },
//     // likes: {
//     //   type: NewsItemConnection,
//     //   description: 'The news items a user has liked',
//     //   args: connectionArgs,
//     //   resolve: (user, args) => connectionFromArray(getUserLikes(user._id), args),
//     // },
//     posts: {
//       type: new GraphQLList(GraphQLNewsItem),
//       resolve: async user => await getNewsItems(),
//     },
//   }),
// });

/* User Mutations */

// const GraphQLNewUserMutation = new GraphQLObjectType({
//   name: 'NewUser',
//   inputFields: {
//     id: { type: new GraphQLNonNull(GraphQLID) },
//     email: { type: GraphQLString },
//   },
//   outputFields: {
//     user: {
//       type: GraphQLUser,
//       resolve: async ({ id }) => getUser(id),
//     },
//   },
//   mutateAndGetPayload: ({ id }) => {
//     // const localNewsItemId = fromGlobalId(id).id;
//     // dislikeNewsItem(localNewsItemId);
//     // Create a user
//     // Return the user
//     return { id /*localNewsItemId*/ };
//   },
// });

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     factions(names: [FactionName]): [Faction]
 *     node(id: String!): Node
 *   }
 */
// const Query = new GraphQLObjectType({
//   name: 'Query',
//   fields: () => ({
//     newsItems: {
//       type: new GraphQLList(GraphQLNewsItem),
//       // args: ommitted this
//       resolve: async (rootValue, args, info) => getNewsItems(),
//     },
//     user: {
//       type: GraphQLUser,
//       resolve: (rootValue, args, info) => getUser(),
//     },
//     // node: nodeField,
//   }),
// });

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 *
 * This implements the following type system shorthand:
 *   type Mutation {
 *     introduceShip(input IntroduceShipInput!): IntroduceShipPayload
 *   }
 */
// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     newUser: {
//       type: GraphQLUser,
//       resolve: user => createUser(user),
//     },
//   }),
// });

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above).
//  */
// export default new GraphQLSchema({
//   query: Query,
//   mutation: Mutation,
// });
