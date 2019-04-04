import * as React from 'react';

import { NewsFeed } from '../components/presentational/NewsFeed';
import { sampleData } from '../data/sample-data';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

export const ActivePage = withData(props => (
  <MainLayout currentURL={props.url.pathname}>
    <NewsFeed newsItems={sampleData.newsItems} />
  </MainLayout>
));

export default ActivePage;
