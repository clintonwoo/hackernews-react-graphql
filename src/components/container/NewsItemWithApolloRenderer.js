import React from 'react';

import NewsItemWithComments from '../presentational/NewsItemWithComments';
import LoadingSpinner from '../presentational/LoadingSpinner';

export default ({ data: { loading, error, newsItem }, data}) => {
  if (error) return <tr><td>Error loading news items.</td></tr>;
  if (newsItem && newsItem.comments) return <NewsItemWithComments newsItem={newsItem} />;
  return <LoadingSpinner />;
};
