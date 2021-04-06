import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
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

export interface IJobsPageOwnProps {
  options: {
    currentUrl: string;
    first: number;
    isJobListing: boolean;
    isRankVisible: boolean;
    isUpvoteVisible: boolean;
    notice: JSX.Element;
    skip: number;
  };
}

export function JobsPage(props): JSX.Element {
  const { router } = props;

  const pageNumber = (router.query && +router.query.p) || 0;

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * pageNumber;

  const { data } = useQuery(query, { variables: { first, skip, type: FeedType.JOB } });

  return (
    <MainLayout currentUrl={router.pathname}>
      <NewsFeed
        currentUrl={router.pathname}
        data={data}
        first={POSTS_PER_PAGE}
        isJobListing
        isRankVisible={false}
        isUpvoteVisible={false}
        notice={
          <>
            <tr key="noticetopspacer" style={{ height: '20px' }} />
            <tr key="notice">
              <td />
              <td>
                <img alt="" src="/static/s.gif" height="1" width="14" />
              </td>
              <td>
                These are jobs at startups that were funded by Y Combinator. You can also get a job
                at a YC startup through{' '}
                <a href="https://triplebyte.com/?ref=yc_jobs">
                  <u>Triplebyte</u>
                </a>
                .
              </td>
            </tr>
            <tr key="noticebottomspacer" style={{ height: '20px' }} />
          </>
        }
        skip={POSTS_PER_PAGE * pageNumber}
      />
    </MainLayout>
  );
}

export default withDataAndRouter(JobsPage);
