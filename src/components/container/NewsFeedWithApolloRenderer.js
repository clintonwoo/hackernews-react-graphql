import React from 'react';
import PropTypes from 'prop-types';

import NewsFeed from '../presentational/NewsFeed';
import LoadingSpinner from '../presentational/LoadingSpinner';

export default ({ data: { loading, error, feed }, data, options }) => {
  if (error) return <tr><td>Error loading news items.</td></tr>;
  if (feed && feed.length) return <NewsFeed newsItems={feed} {...options} />;
  return <LoadingSpinner />;
};

