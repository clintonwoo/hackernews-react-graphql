import React from 'react';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import NewsFeedApolloHOC from '../components/NewsFeedWithApolloRenderer';
import withData from '../helpers/withData';

const POSTS_PER_PAGE = 30;
const pageNumber = 0;
const skip = POSTS_PER_PAGE * pageNumber;
const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      id
      creationTime
      submitterId
      title
      text
      url
      commentCount
      rank
      points
    }
  }
`;
const variables = {
  type: 'TOP',
  first: POSTS_PER_PAGE,
  skip,
};

const TopNewsFeed = graphql(query, {
  options: {
    variables,
  },
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

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <TopNewsFeed />
  </Main>
));
