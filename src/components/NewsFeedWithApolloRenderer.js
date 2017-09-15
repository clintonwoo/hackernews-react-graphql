import React from 'react';
import PropTypes from 'prop-types';

import NewsFeed from './NewsFeed';

export default ({ data: { loading, error, feed }, currentURL }) => {
  if (error) return <tr><td>Error loading news items.</td></tr>;
  if (feed && feed.length) {
    return (
      <NewsFeed newsItems={feed} currentURL={currentURL} />
    );
  }
  return <tr><td>Loading</td></tr>;
};

