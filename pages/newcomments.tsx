import * as React from 'react';

import { NewsFeedView } from '../src/components/news-feed';
import { sampleData } from '../src/data/sample-data';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export function NewCommentsPage(props): JSX.Element {
  const { router } = props;

  const pageNumber = (router.query && +router.query.p) || 0;

  return (
    <MainLayout currentUrl={router.pathname}>
      <NewsFeedView
        currentUrl={router.pathname}
        first={30}
        newsItems={sampleData.newsItems}
        skip={pageNumber * 30}
      />
    </MainLayout>
  );
}

export default withDataAndRouter(NewCommentsPage);
