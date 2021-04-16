import gql from 'graphql-tag';

/*
  Schema properties are in following order:
    Alphabetical
    Resolved fields (requires extra db work)

  Comments are provided when property is not obvious
*/
export const typeDefs = gql(`
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
    top
  
    # Newest entries first
    new

    # Sort by score
    best

    # SHOW HN articles
    show

    # ASK HN articles
    ask

    # Job listings
    job
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
`);

// Example query
// query {
//   feed(type: top, first: 30, skip: 0) {
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
//   }
// }
