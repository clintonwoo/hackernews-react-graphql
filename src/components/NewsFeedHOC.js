import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

import NewsFeed from './NewsFeed';

const NewsFeedHOC = ({ data: { loading, error, feed } }) => {
  if (error) return <div>Error loading news items.</div>;
  if (feed && feed.length) {
    return (
      <NewsFeed newsItems={feed} />
    );
  }
  return <div>Loading</div>;
};
// NewsFeedHOC.propTypes = {
//   data: PropTypes
// }
  //   allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
const hotNewsItems = gql`
  query hotNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
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

const POSTS_PER_PAGE = 30;
const pageNumber = 0;
const skip = POSTS_PER_PAGE * pageNumber;

export default graphql(hotNewsItems, {
  options: {
    variables: {
      type: 'HOT',
      first: POSTS_PER_PAGE,
      skip,
    },
  },
  props: ({ data }) => ({
    data,
    // loadMorePosts: () => {
    //   return data.fetchMore({
    //     variables: {
    //       skip: data.allNewsItems.length
    //     },
    //     updateQuery: (previousResult, { fetchMoreResult }) => {
    //       if (!fetchMoreResult) {
    //         return previousResult
    //       }
    //       return Object.assign({}, previousResult, {
    //         // Append the new posts results to the old one
    //         allNewsItems: [...previousResult.allNewsItems, ...fetchMoreResult.allNewsItems]
    //       })
    //     }
    //   })
    // }
  }),
})(NewsFeedHOC);
