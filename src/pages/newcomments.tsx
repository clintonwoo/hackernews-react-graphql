import * as React from 'react';

import { NewsFeedView } from '../components/news-feed';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

import { sampleData } from '../data/sample-data';

export const NewCommentsPage = withData(props => (
  <MainLayout currentUrl={props.url.pathname}>
    <NewsFeedView newsItems={sampleData.newsItems} first={30} skip={0} currentUrl={props.url.pathname} />
  </MainLayout>
));

export default NewCommentsPage;
