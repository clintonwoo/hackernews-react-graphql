import React from 'react';
import PropTypes from 'prop-types';

// import { graphql, gql } from 'react-apollo';

import NewsTitle from './NewsTitle';
import NewsDetail from './NewsDetail';

const NewsFeed = (props) => {
  // props.newsItems.sort((a, b) => (a.rank - b.rank));
  const rows = [];
  props.newsItems.forEach((newsItem, index) => {
    rows.push(
      <NewsTitle 
        key={`${newsItem.id.toString()}title`}
        isRankVisible={true}
        rank={index}
        {...newsItem}
      />,
    );
    rows.push(
      <NewsDetail
        key={`${newsItem.id.toString()}detail`}
        isFavoriteVisible={false}
        isPostScrutinyVisible={props.isPostScrutinyVisible}
        {...newsItem}
      />,
    );
    rows.push(<tr className="spacer" key={`${newsItem.id.toString()}spacer`} style={{ height: 5 }} />);
  });
  rows.push(<tr key="morespace" className="morespace" style={{ height: '10px' }} />);
  rows.push(<tr key="morelinktr"><td key="morelinkcolspan" colSpan="2" /><td key="morelinktd" className="title"><a key="morelink" href="/news?p=2" className="morelink" rel="nofollow">More</a></td></tr>);

  return (
    <tr>
      <td style={{ padding: '0px' }} >
        <table style={{ border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }} className="itemlist">
          <tbody>
            {rows /*props.newsItems.map(newsItem => (
              <NewsItem
                key={newsItem.id.toString()}
                {...newsItem}
                isRankVisible={true}
                isFavoriteVisible={false}
              />
            ))*/}
          </tbody>
        </table>
      </td>
    </tr>
  );
};
NewsFeed.defaultProps = {
  isPostScrutinyVisible: false,
};
NewsFeed.propTypes = {
  isPostScrutinyVisible: PropTypes.bool,
  newsItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    creationTime: PropTypes.number.isRequired,
    submitterId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    url: PropTypes.string,
    commentCount: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    // favoriteVisible: PropTypes.bool.isRequired,
  })).isRequired,
};

export default NewsFeed;
