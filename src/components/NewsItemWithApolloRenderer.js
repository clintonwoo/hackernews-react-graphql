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
    );
  }
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

export default NewsItemWithComments;
