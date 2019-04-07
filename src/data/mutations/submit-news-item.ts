import { gql } from 'apollo-server-express';
import { NewsFeedView } from '../../components/news-feed';

export interface ISubmitNewsItemGraphQL {
  submitNewsItem: { id }; // Return type of submitNewsItem mutation
}

export const submitNewsItem = gql`
  mutation SubmitNewsItem($title: String!, $url: String) {
    submitNewsItem(title: $title, url: $url) {
      id
      ...NewsFeed
    }
  }
  ${NewsFeedView.fragments.newsItem}
`;
