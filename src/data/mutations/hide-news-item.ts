import { gql } from 'apollo-server-express';

export const hideNewsItem = gql`
  mutation HideNewsItem($id: Int!) {
    hideNewsItem(id: $id) {
      id
      hidden
    }
  }
`;
