import React from 'react';
import { graphql, gql } from 'react-apollo';
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

const TopNewsFeed = graphql(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'TOP',
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
  return (
    <Main currentURL={props.url.pathname}>
      <TopNewsFeed options={{
        currentURL: props.url.pathname,
        first: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * pageNumber,
      }}
      />
    </Main>
  );
});
