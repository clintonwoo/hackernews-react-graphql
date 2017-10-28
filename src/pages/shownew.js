import React from 'react';
import Link from 'next/link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import NewsFeed from '../components/presentational/NewsFeed';
import NewsFeedApolloHOC from '../components/container/NewsFeedWithApolloRenderer';
import withData from '../helpers/withData';

const POSTS_PER_PAGE = 30;

const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeed.fragments.newsItem}
`;

const ShowHNNewsFeed = graphql(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'SHOW',
      first,
      skip,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  loadMorePosts: data => data.fetchMore({
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
})(NewsFeedApolloHOC);

export default withData((props) => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;
  const notice = [
    <tr key="noticetopspacer" style={{ height: '5px' }} />,
    <tr key="notice" >
      <td colSpan="2" />
      <td>
        Please read the <Link prefetch href="/showhn"><a><u>rules</u></a></Link>. You can also
        browse the <Link prefetch href="/shownew"><a><u>newest</u></a></Link> Show HNs.
      </td>
    </tr>,
    <tr key="noticebottomspacer" style={{ height: '10px' }} />,
  ];
  return (
    <Main currentURL={props.url.pathname}>
      <ShowHNNewsFeed options={{
        currentURL: props.url.pathname,
        first: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * pageNumber,
        notice,
      }}
      />
    </Main>
  );
});

