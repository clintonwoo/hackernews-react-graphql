import * as React from 'react';

import { NewsTitleWithData } from '../container/news-title-with-data';
import { NewsDetail } from '../presentational/news-detail';
import { LoadingSpinner } from '../presentational/loading-spinner';

import { CommentBox } from './comment-box';
import { Comments } from './comments';

export const NewsItemWithComments: React.SFC = ({ newsItem }) => (
  <tr>
    <td style={{ padding: '0px' }}>
      <table
        style={{ border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }}
        className="itemlist"
      >
        <tbody>
          <NewsTitleWithData isRankVisible={false} {...newsItem} />
          <NewsDetail isPostScrutinyVisible {...newsItem} />
          <tr key="morespace" className="morespace" style={{ height: '10px' }} />
          <CommentBox />
        </tbody>
      </table>
      <br />
      <br />
      <Comments newsItem={newsItem} />
      <br />
      <br />
    </td>
  </tr>
);

/** Acts as the component for a page of a news item with all it's comments */

export const NewsItem = ({ data: { loading, error, newsItem }, data }) => {
  if (error)
    return (
      <tr>
        <td>Error loading news items.</td>
      </tr>
    );
  if (newsItem && newsItem.comments) return <NewsItemWithComments newsItem={newsItem} />;
  return <LoadingSpinner />;
};
