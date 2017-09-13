import React from 'react';

import Main from '../layouts/Main';
import NewsTitle from '../components/NewsTitle';
import NewsDetail from '../components/NewsDetail';
import CommentBox from '../components/CommentBox';
import Comments from '../components/Comments';
import data from '../data/SampleData';

const HomePage = () => (
  <Main>
    <tr>
      <td style={{ padding: '0px' }} >
        <table style={{ border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }} className="itemlist">
          <tbody>
            <NewsTitle isRankVisible={false} {...data.newsItems[5]} />
            <NewsDetail isPostScrutinyVisible={true} {...data.newsItems[5]} />
            <tr key="morespace" className="morespace" style={{ height: '10px' }} />
            <CommentBox {...data.newsItems[5]} />
          </tbody>
        </table>
        <br />
        <br />
        <Comments {...data.newsItems[5]} />
        <br />
        <br />
      </td>
    </tr>
  </Main>
);

export default HomePage;
