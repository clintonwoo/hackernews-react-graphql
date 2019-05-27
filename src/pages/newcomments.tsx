import * as React from 'react';

import { NewsFeedView } from '../components/news-feed';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

import { sampleData } from '../data/sample-data';

export const NewCommentsPage = withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;

  return (
    <MainLayout currentUrl={props.url.pathname}>
      <NewsFeedView
        currentUrl={props.url.pathname}
        first={30}
        newsItems={sampleData.newsItems}
        skip={pageNumber * 30}
      />
    </MainLayout>
  );
});

export default NewCommentsPage;
