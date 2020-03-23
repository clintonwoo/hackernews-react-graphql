import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { commentsFragment } from '../src/components/comments';
import { newsDetailNewsItemFragment } from '../src/components/news-detail';
import {
  INewsItemWithCommentsProps,
  NewsItemWithComments,
} from '../src/components/news-item-with-comments';
import { newsTitleFragment } from '../src/components/news-title';
import { NewsItemModel } from '../src/data/models';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export interface INewsItemWithCommentsQuery {
  newsItem: NewsItemModel;
}

const newsItemWithCommentsQuery = gql`
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
  ${newsTitleFragment}
  ${newsDetailNewsItemFragment}
  ${commentsFragment}
`;

export interface INewsItemWithCommentsWithGraphQLOwnProps {
  id: number;
}

const NewsItemWithCommentsWithGraphQL = graphql<
  INewsItemWithCommentsWithGraphQLOwnProps,
  INewsItemWithCommentsQuery,
  {},
  INewsItemWithCommentsProps
>(newsItemWithCommentsQuery, {
  options: ({ id }) => ({
    variables: {
      id,
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    error: data?.error!,
    loading: data?.loading!,
    newsItem: data?.newsItem!,
  }),
})(NewsItemWithComments);

export const ItemPage = withDataAndRouter(
  (props): JSX.Element => {
    const { router } = props;

    return (
      <MainLayout currentUrl={router.pathname}>
        <NewsItemWithCommentsWithGraphQL id={(router.query && +router.query.id) || 0} />
      </MainLayout>
    );
  }
);

export default ItemPage;
