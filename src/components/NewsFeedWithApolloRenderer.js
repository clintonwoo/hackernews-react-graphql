import React from 'react';
import PropTypes from 'prop-types';

import NewsFeed from './NewsFeed';

export default ({ data: { loading, error, feed }, options }) => {
  if (error) return <tr><td>Error loading news items.</td></tr>;
  if (feed && feed.length) return <NewsFeed newsItems={feed} {...options} />;
  return (
    <tr>
      <td>
        <div className="sk-circle">
          <div className="sk-circle1 sk-child" />
          <div className="sk-circle2 sk-child" />
          <div className="sk-circle3 sk-child" />
          <div className="sk-circle4 sk-child" />
          <div className="sk-circle5 sk-child" />
          <div className="sk-circle6 sk-child" />
          <div className="sk-circle7 sk-child" />
          <div className="sk-circle8 sk-child" />
          <div className="sk-circle9 sk-child" />
          <div className="sk-circle10 sk-child" />
          <div className="sk-circle11 sk-child" />
          <div className="sk-circle12 sk-child" />
        </div>
      </td>
    </tr>
  );
};

