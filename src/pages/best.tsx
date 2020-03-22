import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import {
  NewsFeed,
  newsFeedNewsItemFragment,
  INewsFeedData,
  INewsFeedContainerProps,
} from '../components/news-feed';
import { FeedType } from '../data/models';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

const POSTS_PER_PAGE = 30;

const query = gql`
  query bestNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
`;

export interface IBestNewsFeedProps {
  options: {
    currentUrl: string;
    first: number;
    skip: number;
  };
}

const BestNewsFeed = graphql<IBestNewsFeedProps, INewsFeedData, {}, INewsFeedContainerProps>(
  query,
  {
    options({ options: { first, skip } }) {
      return { variables: { type: FeedType.BEST, first, skip } };
    },
    props({ ownProps, data }) {
      return { ...ownProps, data: data! };
    },
  }
)(NewsFeed);

export const BestPage = withData((props) => {
  const pageNumber = (props.dataContext.query && +props.dataContext.query.p) || 0;

  return (
    <MainLayout currentUrl={props.dataContext.pathname}>
      <BestNewsFeed
        options={{
          currentUrl: props.dataContext.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});

export default BestPage;
