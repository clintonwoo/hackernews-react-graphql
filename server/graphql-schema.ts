import gql from 'graphql-tag';

/*
  Schema properties are in following order:
    Alphabetical
    Resolved fields (requires extra db work)

  Comments are provided when property is not obvious
*/
export const typeDefs = gql`
    scalar Date

    type Vote {
        id: String!
        createdAt: Date!
        updatedAt: Date
        value: Float!
        userId: String!
        user: User
        articleId: String!
        article: Article
    }


    type Article {

        id: String!

        comments: [Comment]!
        
        # The news item headline
        title: String!

        description: String
        
        url: String

        score: Float
        
        # Fetches the author based on submitterId
        user: User
        
    }
    
    type Tag {
        id: String!
        createdAt: Date!
        updatedAt: Date
        
        userId: String!
        user: User
        articleId: String!
        article: Article
    }
    

    type User {
        # The user ID is a string of the username
        id: String!
        createdAt: Date!
        updatedAt: Date
        
        zendeskId: String!

        articles: [Article]!
        tags: [Tag]!
    }

    # the schema allows the following queries:
    type Query {
        # A comment, it's parent could be another comment or a news item.
        comment(id: Int!): Comment

        feed(
            # The sort order for the feed
#            type: FeedType!,

            # The number of items to fetch (starting from the skip index), for pagination
#            first: Int

            # The number of items to skip, for pagination
            skip: Int,
        ): [Article]
        
        # A news item
        article(id: Int!): Article

        # A user
        user(zendeskId: String!): User
    }

    # This schema allows the following mutations:
    type Mutation {
        voteOnArticle(
            articleId: String!
            userId: String!
            vote: Int! # 1-4
        ): Article

        tagArticle(
            articleId: String!
            UserId: String!
            tag: String
        ): Article
        
        submitArticle (
            title: String!
            url: String!
            description: String
            userId: String!
        ): Article
        
        initializeUser(
            userId: String!
        ): User
    }
`;

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
