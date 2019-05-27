export const hideNewsItem = `
  mutation HideNewsItem($id: Int!) {
    hideNewsItem(id: $id) {
      id
      hidden
    }
  }
`;
