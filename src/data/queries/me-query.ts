import gql from 'graphql-tag';

export interface IMeQuery {
  me: {
    id: string;
    karma: number;
  };
}

export const ME_QUERY = gql`
  query User {
    me {
      id
      karma
    }
  }
`;
