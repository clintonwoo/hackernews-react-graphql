export interface ISubmitNewsItemGraphQL {
  submitNewsItem: { id }; // Return type of submitNewsItem mutation
}

export const submitNewsItemMutation = `
  mutation SubmitNewsItem($title: String!, $url: String) {
    submitNewsItem(title: $title, url: $url) {
      id
      ...NewsFeed
    }
  }
`;
