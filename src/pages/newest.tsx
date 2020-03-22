import { gql } from 'apollo-server-express';
import { withRouter } from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';

import {
  NewsFeed,
  newsFeedNewsItemFragment,
  INewsFeedData,
  INewsFeedContainerProps,
} from '../components/news-feed';
import { withDataAndRouter } from '../helpers/with-data';
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

export interface INewestNewsFeedProps {
  options: {
    currentUrl: string;
    first: number;
    skip: number;
  };
}

const NewestNewsFeed = graphql<INewestNewsFeedProps, INewsFeedData, {}, INewsFeedContainerProps>(
  query,
  {
    options({ options: { first, skip } }) {
      return { variables: { first, skip, type: 'NEW' } };
    },
    props({ ownProps, data }) {
      return { ...ownProps, data: data! };
    },
  }
)(NewsFeed);

export const NewestPage = withDataAndRouter(
  withRouter(props => {
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
  })
);

export default NewestPage;
