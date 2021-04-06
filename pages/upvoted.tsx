import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import * as React from 'react';

import { NewsFeed, newsFeedNewsItemFragment } from '../src/components/news-feed';
import { POSTS_PER_PAGE } from '../src/config';
import { FeedType } from '../src/data/models';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

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
    currentUrl: string;
    first: number;
    skip: number;
  };
}

export function UpvotedPage(props): JSX.Element {
  const { router } = props;

  const pageNumber = (router.query && +router.query.p) || 0;

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * pageNumber;

  const { data } = useQuery(query, {
    variables: { type: FeedType.NEW, first, skip },
  });

  return (
    <MainLayout currentUrl={router.pathname}>
      <NewsFeed data={data} currentUrl={router.pathname} first={first} skip={skip} />
    </MainLayout>
  );
}

export default withDataAndRouter(UpvotedPage);
