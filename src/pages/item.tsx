import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { MainLayout } from '../layouts/main-layout';
import { NewsItemWithApolloRenderer } from '../components/container/news-item-with-apollo-renderer';
import { NewsTitleView } from '../components/news-title';
import { NewsDetailView } from '../components/news-detail';
import { Comments } from '../components/comments';
import { withData } from '../helpers/with-data';

const query = gql`
  query NewsItemWithComments($id: Int!) {
    newsItem(id: $id) {
      id
      comments {
        ...Comments
      }
      ...NewsTitle
      ...NewsDetail
    }
  }
  ${NewsTitleView.fragments.newsItem}
  ${NewsDetailView.fragments.newsItem}
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
})(NewsItemWithApolloRenderer);

export const ItemPage = withData(props => (
  <MainLayout currentUrl={props.url.pathname}>
    <NewsItemWithComments id={(props.url.query && +props.url.query.id) || 0} />
  </MainLayout>
));

export default ItemPage;
