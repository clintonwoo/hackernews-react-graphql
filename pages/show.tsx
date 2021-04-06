import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import * as React from 'react';

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

export interface IShowHNNewsFeedProps {
  options: {
    currentUrl: string;
    first: number;
    notice: JSX.Element;
    skip: number;
  };
}

export function ShowHNPage(props): JSX.Element {
  const { router } = props;
  const pageNumber = (router.query && +router.query.p) || 0;

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * pageNumber;

  const { data } = useQuery(query, { variables: { first, skip, type: FeedType.SHOW } });

  return (
    <MainLayout currentUrl={router.pathname}>
      <NewsFeed
        data={data}
        currentUrl={router.pathname}
        first={first}
        skip={skip}
        notice={
          <>
            <tr key="noticetopspacer" style={{ height: '5px' }} />
            <tr key="notice">
              <td colSpan={2} />
              <td>
                Please read the{' '}
                <Link href="/showhn">
                  <a>
                    <u>rules</u>
                  </a>
                </Link>
                . You can also browse the{' '}
                <Link href="/shownew">
                  <a>
                    <u>newest</u>
                  </a>
                </Link>{' '}
                Show HNs.
              </td>
            </tr>
            <tr key="noticebottomspacer" style={{ height: '10px' }} />
          </>
        }
      />
    </MainLayout>
  );
}

export default withDataAndRouter(ShowHNPage);
