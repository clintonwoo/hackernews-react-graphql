import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from '@apollo/client';

import { commentsFragment } from '../src/components/comments';
import { newsDetailNewsItemFragment } from '../src/components/news-detail';
import { NewsItemWithComments } from '../src/components/news-item-with-comments';
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

export function ItemPage(props): JSX.Element {
  const { router } = props;

  const { data } = useQuery(newsItemWithCommentsQuery, {
    variables: { id: (router.query && +router.query.id) || 0 },
  });

  return (
    <MainLayout currentUrl={router.pathname}>
      <NewsItemWithComments error={data?.error} loading={data?.loading} newsItem={data?.newsItem} />
    </MainLayout>
  );
}

export default withDataAndRouter(ItemPage);
