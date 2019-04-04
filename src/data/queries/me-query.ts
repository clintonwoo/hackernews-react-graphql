import gql from 'graphql-tag';

export const meQuery = gql`
  query User {
    me {
      id
      karma
    }
  }
`;
