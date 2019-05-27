// import { gql } from 'apollo-server-express';

export const hideNewsItem = `
  mutation HideNewsItem($id: Int!) {
    hideNewsItem(id: $id) {
      id
      hidden
    }
  }
`;
console.log('hide', hideNewsItem);
