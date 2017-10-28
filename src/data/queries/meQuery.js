import gql from 'graphql-tag';

export default gql`
  query User {
    me {
      id
      karma
    }
  }
`;
