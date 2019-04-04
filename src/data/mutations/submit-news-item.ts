import gql from 'graphql-tag';
import { NewsFeed } from '../../components/presentational/NewsFeed';

export const submitNewsItem = gql`
  mutation SubmitNewsItem($title: String!, $url: String) {
    submitNewsItem(title: $title, url: $url) {
      id
      ...NewsFeed
    }
  }
  ${NewsFeed.fragments.newsItem}
`;
