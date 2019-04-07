import * as React from 'react';

import { MainLayout } from '../layouts/main-layout';
import { NewsFeedView } from '../components/news-feed';
import { withData } from '../helpers/with-data';

import { sampleData } from '../data/sample-data';

export const BestCommentsPage = withData(props => (
  <MainLayout currentUrl={props.url.pathname}>
    <NewsFeedView newsItems={sampleData.newsItems} />
  </MainLayout>
));

export default BestCommentsPage;
