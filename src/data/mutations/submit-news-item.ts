// import { gql } from 'apollo-server-express';
// import { newsFeedNewsItemFragment } from '../../components/news-feed';

export interface ISubmitNewsItemGraphQL {
  submitNewsItem: { id }; // Return type of submitNewsItem mutation
}

export const submitNewsItem = `
  mutation SubmitNewsItem($title: String!, $url: String) {
    submitNewsItem(title: $title, url: $url) {
      id
      ...NewsFeed
    }
  }
`;
// export const submitNewsItem = gql`
//   mutation SubmitNewsItem($title: String!, $url: String) {
//     submitNewsItem(title: $title, url: $url) {
//       id
//       ...NewsFeed
//     }
//   }
//   ${newsFeedNewsItemFragment}
// `;
