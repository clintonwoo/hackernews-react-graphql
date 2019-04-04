import gql from 'graphql-tag';

export const hideNewsItem = gql`
  mutation HideNewsItem($id: Int!) {
    hideNewsItem(id: $id) {
      id
      hidden
    }
  }
`;
