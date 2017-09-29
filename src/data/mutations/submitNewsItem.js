import { gql } from 'react-apollo';
import NewsFeed from '../../components/presentational/NewsFeed';

export default gql`
  mutation SubmitNewsItem($title: String!, $url: String) {
    submitNewsItem(title: $title, url: $url) {
      id
      ...NewsFeed
    }
  }
  ${NewsFeed.fragments.newsItem}
`;
