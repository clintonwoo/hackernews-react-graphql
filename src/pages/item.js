import React from 'react';
import { graphql, gql } from 'react-apollo';

import Main from '../layouts/Main';
import NewsItem from '../components/NewsItemWithApolloRenderer';
import NewsTitle from '../components/NewsTitle';
import NewsDetail from '../components/NewsDetail';
import Comments from '../components/Comments';
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
const variables = {
  id: 1235,
};

const NewsItemWithComments = graphql(query, {
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
})(NewsItem);

export default withData((props) => {
  variables.id = (props.url.query && +props.url.query.id) || 0;
  return (
    <Main currentURL={props.url.pathname}>
      <NewsItemWithComments />
    </Main>
  );
});
