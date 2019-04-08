import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { NewsFeed, NewsFeedView } from '../components/news-feed';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

const POSTS_PER_PAGE = 30;

const query = gql`
  query NewestFeed($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeedView.fragments.newsItem}
`;

export interface INewestNewsFeedProps {
  options: {
    first: number;
    skip: number;
  };
}

const NewestNewsFeed = graphql<INewestNewsFeedProps>(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      first,
      skip,
      type: 'NEW',
    },
  }),
  props: ({ data }) => ({
    data,
  }),
})(NewsFeed);

export const NewestPage = withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;

  return (
    <MainLayout currentUrl={props.url.pathname}>
      <NewestNewsFeed
        options={{
          currentUrl: props.url.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});

export default NewestPage;
