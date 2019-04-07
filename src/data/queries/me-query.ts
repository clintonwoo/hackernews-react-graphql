import { gql } from 'apollo-server-express';

export interface IMeQuery {
  me: {
    id: number;
    karma: number;
  };
}

export const meQuery = gql`
  query User {
    me {
      id
      karma
    }
  }
`;
