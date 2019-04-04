import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { MainLayout } from '../layouts/main-layout';
import { NewsFeed } from '../components/presentational/NewsFeed';
import { NewsFeedWithApolloRenderer } from '../components/container/NewsFeedWithApolloRenderer';
import { withData } from '../helpers/with-data';

const POSTS_PER_PAGE = 30;

const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeed.fragments.newsItem}
`;

const JobNewsFeed = graphql(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'JOB',
      first,
      skip,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  loadMorePosts: data =>
    data.fetchMore({
      variables: {
        skip: data.allNewsItems.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          allNewsItems: [...previousResult.allNewsItems, ...fetchMoreResult.allNewsItems],
        });
      },
    }),
})(NewsFeedWithApolloRenderer);

export default withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;
  const notice = [
    <tr key="noticetopspacer" style={{ height: '20px' }} />,
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
    </tr>,
    <tr key="noticebottomspacer" style={{ height: '20px' }} />,
  ];
  return (
    <MainLayout currentURL={props.url.pathname}>
      <JobNewsFeed
        options={{
          currentURL: props.url.pathname,
          first: POSTS_PER_PAGE,
          isRankVisible: false,
          isUpvoteVisible: false,
          isJobListing: true,
          skip: POSTS_PER_PAGE * pageNumber,
          notice,
        }}
      />
    </MainLayout>
  );
});
