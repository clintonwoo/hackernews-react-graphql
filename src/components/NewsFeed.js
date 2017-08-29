import React from 'react';
import PropTypes from 'prop-types';
import url from 'url';
import { graphql, gql } from 'react-apollo';

import NewsItem from './NewsItem';
import NewsTitle from './NewsTitle';
import NewsDetail from './NewsDetail';

const NewsFeed = (props) => {
  props.newsItems.sort((a, b) => (a.rank - b.rank));

  const rows = [];
  props.newsItems.forEach((newsItem) => {
    rows.push(
      <NewsTitle key={`${newsItem.id.toString()}title`} rankVisible={true} {...newsItem} />,
    );
    rows.push(
      <NewsDetail key={`${newsItem.id.toString()}detail`} favoriteVisible={false} {...newsItem} />,
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
                rankVisible={true}
                favoriteVisible={false}
              />
            ))*/}
          </tbody>
        </table>
      </td>
    </tr>
  );
};
// NewsFeed.propTypes = {
//   newsItems: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     creationTime: PropTypes.instanceOf(Date).isRequired,
//     submitterId: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     text: PropTypes.string,
//     url: PropTypes.string,
//     commentCount: PropTypes.number.isRequired,
//     points: PropTypes.number.isRequired,
//     // favoriteVisible: PropTypes.bool.isRequired,
//   })).isRequired,
// };
//query allPosts($first: Int!, $skip: Int!) {
const allPosts = gql`
  query {
    newsItems {
      id
      creationTime
      submitterId
      title
      text
      url
      commentCount
      points
    }
  }
`;
export default graphql(allPosts, {
  // options: {
  //   variables: {
  //     skip: 0,
  //     first: POSTS_PER_PAGE
  //   }
  // },
  // props: ({ data }) => ({
  //   data,
  //   loadMorePosts: () => {
  //     return data.fetchMore({
  //       variables: {
  //         skip: data.allPosts.length
  //       },
  //       updateQuery: (previousResult, { fetchMoreResult }) => {
  //         if (!fetchMoreResult) {
  //           return previousResult
  //         }
  //         return Object.assign({}, previousResult, {
  //           // Append the new posts results to the old one
  //           allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
  //         })
  //       }
  //     })
  //   }
  // })
})(NewsFeed);

// export default NewsFeed;
