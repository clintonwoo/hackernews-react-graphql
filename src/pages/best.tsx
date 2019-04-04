import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { MainLayout } from '../layouts/main-layout';
import { NewsFeed } from '../components/presentational/NewsFeed';
import { NewsFeedWithApolloRenderer } from '../components/container/NewsFeedWithApolloRenderer';
import { withData } from '../helpers/with-data';

const POSTS_PER_PAGE = 30;

const query = gql`
  query bestNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeed.fragments.newsItem}
`;

const BestNewsFeed = graphql(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'BEST',
      first,
      skip,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
})(NewsFeedWithApolloRenderer);

export default withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;
  return (
    <MainLayout currentURL={props.url.pathname}>
      <BestNewsFeed
        options={{
          currentURL: props.url.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});
