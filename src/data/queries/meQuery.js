import {
  gql,
} from 'react-apollo';

export default gql`
  query User {
    me {
      id
      karma
    }
  }
`;
