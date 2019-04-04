import * as React from 'react';

import { MainLayout } from '../layouts/main-layout';
import { NewsFeed } from '../components/presentational/NewsFeed';
import { withData } from '../helpers/with-data';

import { sampleData } from '../data/sample-data';

export default withData(props => (
  <MainLayout currentURL={props.url.pathname}>
    <NewsFeed newsItems={data.newsItems} />
  </MainLayout>
));
