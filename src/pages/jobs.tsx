import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { NewsFeed, newsFeedNewsItemFragment } from '../components/news-feed';
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

export interface IJobsPageProps extends IJobsPageOwnProps {}

export interface IJobsPageOwnProps {
  options: {
    first: number;
    skip: number;
  };
}

const JobNewsFeed = graphql<IJobsPageOwnProps>(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      first,
      skip,
      type: 'JOB',
    },
  }),
  props: ({ data }) => ({
    data,
  }),
})(NewsFeed);

export const JobsPage = withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;

  const notice = (
    <>
      <tr key="noticetopspacer" style={{ height: '20px' }} />
      <tr key="notice">
        <td />
        <td>
          <img alt="" src="/static/s.gif" height="1" width="14" />
        </td>
        <td>
          These are jobs at startups that were funded by Y Combinator. You can also get a job at a YC startup through{' '}
          <a href="https://triplebyte.com/?ref=yc_jobs">
            <u>Triplebyte</u>
          </a>
          .
        </td>
      </tr>
      <tr key="noticebottomspacer" style={{ height: '20px' }} />
    </>
  );

  return (
    <MainLayout currentUrl={props.url.pathname}>
      <JobNewsFeed
        options={{
          currentUrl: props.url.pathname,
          first: POSTS_PER_PAGE,
          isJobListing: true,
          isRankVisible: false,
          isUpvoteVisible: false,
          notice,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});

export default JobsPage;
