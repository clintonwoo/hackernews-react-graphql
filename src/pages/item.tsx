import * as React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-server-express';

import { MainLayout } from '../layouts/main-layout';
import { NewsItemWithComments } from '../components/news-item-with-comments';
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

export interface INewsItemWithCommentsWithGraphQLProps {
  id: number;
}

const NewsItemWithCommentsWithGraphQL = graphql<INewsItemWithCommentsWithGraphQLProps>(query, {
  options: ({ id }) => ({
    variables: {
      id,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  // loadMorePosts: data =>
  //   data.fetchMore({
  //     variables: {
  //       skip: data.allNewsItems.length,
  //     },
  //     updateQuery: (previousResult, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) {
  //         return previousResult;
  //       }
  //       return Object.assign({}, previousResult, {
  //         // Append the new posts results to the old one
  //         allNewsItems: [...previousResult.allNewsItems, ...fetchMoreResult.allNewsItems],
  //       });
  //     },
  //   }),
})(NewsItemWithComments);

export const ItemPage = withData(props => (
  <MainLayout currentUrl={props.url.pathname}>
    <NewsItemWithCommentsWithGraphQL id={(props.url.query && +props.url.query.id) || 0} />
  </MainLayout>
));

export default ItemPage;
