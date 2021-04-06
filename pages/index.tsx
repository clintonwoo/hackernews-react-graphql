import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from '@apollo/client';

import { NewsFeed, newsFeedNewsItemFragment } from '../src/components/news-feed';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';
import { FeedType } from '../src/data/models';
import { POSTS_PER_PAGE } from '../src/config';

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

export function IndexPage(props): JSX.Element {
  const { router } = props;

  const pageNumber = (router.query && +router.query.p) || 0;

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * pageNumber;

  const { data } = useQuery(query, { variables: { first, skip, type: FeedType.TOP } });

  return (
    <MainLayout currentUrl={router.pathname}>
      <NewsFeed data={data} currentUrl={router.pathname} first={first} skip={skip} />
    </MainLayout>
  );
}

export default withDataAndRouter(IndexPage);
