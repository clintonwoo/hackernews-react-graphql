import { gql } from 'react-apollo';

export default gql`
  mutation HideNewsItem($id: Int!) {
    hideNewsItem(id: $id) {
      id
      hidden
    }
  }
`;
