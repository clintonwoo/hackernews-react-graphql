import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

import NewsFeed from './NewsFeed';

const NewsFeedHOC = ({ data: { loading, error, newsItems } }) => {
  if (error) return <div>Error loading news items.</div>;
  if (newsItems && newsItems.length) {
    return (
      <NewsFeed newsItems={newsItems} />
    );
  }
  return <div>Loading</div>;
};
// NewsFeedHOC.propTypes = {
//   data: PropTypes
// }
  // query allPosts($first: Int!, $skip: Int!) {
  //   allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
  //     query frontPageNewsItems($first: Int!, $skip: Int!) {
  //   feed(type: HOT, skip: $skip, first: $first){
const allNewsItems = gql`
  query frontPageNewsItems {
    newsItems {
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
export default graphql(allNewsItems, {
  options: {
    variables: {
      skip: 0,
      first: POSTS_PER_PAGE
    }
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
  })
})(NewsFeedHOC);
