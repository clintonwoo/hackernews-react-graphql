import React from 'react';

import NewsTitle from '../container/NewsTitleWithData';
import NewsDetail from '../container/NewsDetailWithData';

import CommentBox from '../presentational/CommentBox';
import Comments from '../presentational/Comments';

export default ({ newsItem }) => (
  <tr>
    <td style={{ padding: '0px' }} >
      <table style={{ border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }} className="itemlist">
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
