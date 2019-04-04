import * as React from 'react';

import NewsTitle from '../container/NewsTitleWithData';
import NewsDetail from '../container/NewsDetailWithData';

import { CommentBox } from './CommentBox';
import { Comments } from './Comments';

export const NewsItemWithComments: React.SFC = ({ newsItem }) => (
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
