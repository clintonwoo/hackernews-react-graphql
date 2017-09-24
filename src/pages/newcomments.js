import React from 'react';

import Main from '../layouts/Main';
import NewsFeed from '../components/presentational/NewsFeed';
import withData from '../helpers/withData';

import data from '../data/SampleData';

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <NewsFeed
      newsItems={data.newsItems}
      first={30}
      skip={0}
      currentURL={props.url.pathname}
    />
  </Main>
));
