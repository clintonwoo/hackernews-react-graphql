import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Main from '../layouts/Main';
import NewsItem from '../components/container/NewsItemWithApolloRenderer';
import NewsTitle from '../components/presentational/NewsTitle';
import NewsDetail from '../components/presentational/NewsDetail';
import Comments from '../components/presentational/Comments';
import withData from '../helpers/withData';

const query = gql`
  query NewsItemWithComments($id: Int!) {
    newsItem(id: $id) {
      id,
      comments {
        ...Comments
      }
      ...NewsTitle
      ...NewsDetail
    }
  }
  ${NewsTitle.fragments.newsItem}
  ${NewsDetail.fragments.newsItem}
  ${Comments.fragments.comment}
`;

const NewsItemWithComments = graphql(query, {
  options: ({ id }) => ({
    variables: {
      id,
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
})(NewsItem);

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <NewsItemWithComments id={(props.url.query && +props.url.query.id) || 0} />
  </Main>
));
