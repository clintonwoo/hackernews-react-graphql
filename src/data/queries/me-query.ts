import { gql } from 'apollo-server-express';

export interface IMeQuery {
  me: {
    id: string;
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
