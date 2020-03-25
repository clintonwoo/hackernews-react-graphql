import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';

import {
  NewsFeed,
  newsFeedNewsItemFragment,
  INewsFeedData,
  INewsFeedContainerProps,
} from '../src/components/news-feed';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';
import { FeedType } from '../src/data/models';

const POSTS_PER_PAGE = 30;

const query = gql`
  query NewestFeed($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
`;

export interface INewestNewsFeedOwnProps {
  options: {
    currentUrl: string;
    first: number;
    skip: number;
  };
}

const NewestNewsFeed = graphql<INewestNewsFeedOwnProps, INewsFeedData, {}, INewsFeedContainerProps>(
  query,
  {
    options({ options: { first, skip } }) {
      return { variables: { type: FeedType.NEW, first, skip } };
    },
    props({ ownProps, data }) {
      return { ...ownProps, data: data! };
    },
  }
)(NewsFeed);

export const FavoritesPage = withDataAndRouter((props) => {
  const pageNumber = (props.router.query && +props.router.query.p) || 0;

  return (
    <MainLayout currentUrl={props.router.pathname}>
      <NewestNewsFeed
        options={{
          currentUrl: props.router.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});

export default FavoritesPage;
