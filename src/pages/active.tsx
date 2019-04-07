import * as React from 'react';

import { NewsFeedView } from '../components/news-feed';
import { sampleData } from '../data/sample-data';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

export const ActivePage = withData(props => (
  <MainLayout currentUrl={props.url.pathname}>{/* <NewsFeedView newsItems={sampleData.newsItems} /> */}</MainLayout>
));

export default ActivePage;
