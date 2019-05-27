export interface IMeQuery {
  me: {
    id: string;
    karma: number;
  };
}

export const meQuery = `
  query User {
    me {
      id
      karma
    }
  }
`;
