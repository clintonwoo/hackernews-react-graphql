import gql from 'graphql-tag';
import { NewsFeedView } from '../../components/news-feed';

export const submitNewsItem = gql`
  mutation SubmitNewsItem($title: String!, $url: String) {
    submitNewsItem(title: $title, url: $url) {
      id
      ...NewsFeed
    }
  }
  ${NewsFeedView.fragments.newsItem}
`;
