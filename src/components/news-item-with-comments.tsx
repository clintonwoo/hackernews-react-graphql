import * as React from 'react';

import { NewsItemModel } from '../data/models';
import { CommentBox } from './comment-box';
import { Comments } from './comments';
import { LoadingSpinner } from './loading-spinner';
import { NewsDetail } from './news-detail';
import { NewsTitle } from './news-title';

export interface INewsItemWithCommentsProps {
  error: Error;
  loading: boolean;
  newsItem: NewsItemModel;
}

/** Acts as the component for a page of a news item with all it's comments */
export function NewsItemWithComments(props: INewsItemWithCommentsProps): JSX.Element {
  const { loading, error, newsItem } = props;

  if (error) {
    return (
      <tr>
        <td>Error loading news items.</td>
      </tr>
    );
  }

  if (loading || !newsItem || !newsItem.comments) {
    return <LoadingSpinner />;
  }

  return (
    <tr>
      <td style={{ padding: '0px' }}>
        <table
          style={{
            border: '0px',
            padding: '0px',
            borderCollapse: 'collapse',
            borderSpacing: '0px',
          }}
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
}
