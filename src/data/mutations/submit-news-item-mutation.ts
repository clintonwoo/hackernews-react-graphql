import gql from 'graphql-tag';

import { newsFeedNewsItemFragment } from '../../components/news-feed';

export interface ISubmitNewsItemGraphQL {
  submitNewsItem: { id }; // Return type of submitNewsItem mutation
}

export const SUBMIT_NEWS_ITEM_MUTATION = gql`
  mutation SubmitNewsItem($title: String!, $url: String) {
    submitNewsItem(title: $title, url: $url) {
      id
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
`;
