import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import {
  NewsFeed,
  newsFeedNewsItemFragment,
  INewsFeedContainerProps,
  INewsFeedData,
} from '../components/news-feed';
import { FeedType } from '../data/models';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

const POSTS_PER_PAGE = 30;

const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
`;

export interface IAskPageProps {
  options: {
    currentUrl: string;
    first: number;
    skip: number;
  };
}

const AskPageNewsFeedWithGraphQL = graphql<
  IAskPageProps,
  INewsFeedData,
  {},
  INewsFeedContainerProps
>(query, {
  options({ options: { first, skip } }) {
    return { variables: { first, skip, type: FeedType.ASK } };
  },
  props({ ownProps, data }) {
    return { ...ownProps, data: data! };
  },
})(NewsFeed);

export const AskPage = withData((props) => {
  const pageNumber = (props.dataContext.query && +props.dataContext.query.p) || 0;

  return (
    <MainLayout currentUrl={props.dataContext.pathname}>
      <AskPageNewsFeedWithGraphQL
        options={{
          currentUrl: props.dataContext.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});

export default AskPage;
