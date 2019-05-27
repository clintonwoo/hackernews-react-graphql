export const upvoteNewsItem = `
  mutation UpvoteNewsItem($id: Int!) {
    upvoteNewsItem(id: $id) {
      id
      upvoteCount
      upvoted
    }
  }
`;
