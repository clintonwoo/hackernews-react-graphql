import { withRouter } from 'next/router';
import * as React from 'react';

import { NewsFeedView } from '../components/news-feed';
import { sampleData } from '../data/sample-data';
import { withDataAndRouter } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

export const NewCommentsPage = withRouter<any>(
  withDataAndRouter(props => {
    const pageNumber = (props.router.query && +props.router.query.p) || 0;

    return (
      <MainLayout currentUrl={props.router.pathname}>
        <NewsFeedView
          currentUrl={props.router.pathname}
          first={30}
          newsItems={sampleData.newsItems}
          skip={pageNumber * 30}
        />
      </MainLayout>
    );
  })
);

export default NewCommentsPage;
