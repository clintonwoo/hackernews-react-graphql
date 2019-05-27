import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { NewsFeed, newsFeedNewsItemFragment } from '../components/news-feed';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

const POSTS_PER_PAGE = 30;

const query = gql`
  query NewestFeed($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
`;

export interface IUpvotedPageProps {
  options: {
    first: number;
    skip: number;
  };
}

const NewestNewsFeed = graphql<IUpvotedPageProps>(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'NEW',
      first,
      skip,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
})(NewsFeed);

export const UpvotedPage = withData(props => {
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

export default UpvotedPage;
