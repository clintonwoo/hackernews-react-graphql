import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { NewsFeed, newsFeedNewsItemFragment } from '../src/components/news-feed';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';
import { FeedType } from '../src/data/models';
import { POSTS_PER_PAGE } from '../src/config';

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

export const UpvotedPage = withDataAndRouter((props) => {
  const pageNumber = (props.router.query && +props.router.query.p) || 0;

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * pageNumber;

  const { data } = useQuery(query, {
    variables: { type: FeedType.NEW, first, skip },
  });

  return (
    <MainLayout currentUrl={props.router.pathname}>
      <NewsFeed data={data} currentUrl={props.router.pathname} first={first} skip={skip} />
    </MainLayout>
  );
});

export default UpvotedPage;
