import React from 'react';

import Main from '../layouts/Main';
import NewsFeed from '../components/NewsFeed';

import data from '../data/SampleData';

const Newest = () => (
  <Main>
    <NewsFeed
      newsItems={data.newsItems /*this.props.newsItems*/}
    />
  </Main>
);

export default Newest;
