import { gql } from 'apollo-server-express';

export const upvoteNewsItem = gql`
  mutation UpvoteNewsItem($id: Int!) {
    upvoteNewsItem(id: $id) {
      id
      upvoteCount
      upvoted
    }
  }
`;
