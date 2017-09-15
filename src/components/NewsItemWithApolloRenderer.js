import React from 'react';

import NewsTitle from './NewsTitle';
import NewsDetail from './NewsDetail';
import CommentBox from './CommentBox';
import Comments from './Comments';

const NewsItemWithComments = ({ data: { loading, error, newsItem }, data}) => {
  if (error) return <tr><td>Error loading news items.</td></tr>;
  if (newsItem && newsItem.comments) {
    return (
      <tr>
        <td style={{ padding: '0px' }} >
          <table style={{ border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }} className="itemlist">
            <tbody>
              <NewsTitle isRankVisible={false} {...newsItem} />
              <NewsDetail isPostScrutinyVisible={true} {...newsItem} />
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
    )
  }
  return <tr><td>Loading</td></tr>;
};

export default NewsItemWithComments;
