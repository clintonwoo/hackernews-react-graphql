import { gql } from 'apollo-server-express';
import { useRouter } from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';

import {
  NewsFeed,
  newsFeedNewsItemFragment,
  INewsFeedData,
  INewsFeedContainerProps,
} from '../components/news-feed';
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

export interface ITopNewsFeedProps {
  options: {
    currentUrl: string;
    first: number;
    skip: number;
  };
}

const TopNewsFeed = graphql<ITopNewsFeedProps, INewsFeedData, {}, INewsFeedContainerProps>(query, {
  options({ options: { first, skip } }) {
    return { variables: { first, skip, type: 'TOP' } };
  },
  props({ ownProps, data }) {
    return { ...ownProps, data: data! };
  },
})(NewsFeed);

export const IndexPage = () => {
  // const router = useRouter();
  // const pageNumber = (router.query && +router.query.p) || 0;

  return <></>;
  // return (
  //   <MainLayout currentUrl={router.pathname}>
  //     <TopNewsFeed
  //       options={{
  //         currentUrl: router.pathname,
  //         first: POSTS_PER_PAGE,
  //         skip: POSTS_PER_PAGE * pageNumber,
  //       }}
  //     />
  //   </MainLayout>
  // );
};

export default IndexPage;
