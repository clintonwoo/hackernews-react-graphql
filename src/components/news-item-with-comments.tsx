import * as React from 'react';

import { NewsTitle } from './news-title';
import { NewsDetail } from './news-detail';
import { LoadingSpinner } from './loading-spinner';

import { CommentBox } from './comment-box';
import { Comments } from './comments';
import { NewsItem } from '../data/models';

export interface INewsItemWithcommentsProps {
  newsItem: NewsItem;
}

export const NewsItemWithCommentsView: React.SFC<INewsItemWithcommentsProps> = ({ newsItem }) => (
  <tr>
    <td style={{ padding: '0px' }}>
      <table
        style={{ border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }}
        className="itemlist"
      >
        <tbody>
          <NewsTitle isRankVisible={false} {...newsItem} />
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

export const NewsItemWithComments = ({ data: { loading, error, newsItem }, data }) => {
  if (error) {
    return (
      <tr>
        <td>Error loading news items.</td>
      </tr>
    );
  }

  if (newsItem && newsItem.comments) {
    return <NewsItemWithCommentsView newsItem={newsItem} />;
  }

  return <LoadingSpinner />;
};
