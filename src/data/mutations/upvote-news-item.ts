import gql from 'graphql-tag';

export const upvoteNewsItem = gql`
  mutation UpvoteNewsItem($id: Int!) {
    upvoteNewsItem(id: $id) {
      id
      upvoteCount
      upvoted
    }
  }
`;
