import React from 'react';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import NewsFeedHOC from '../components/NewsFeedHOC';
import withData from '../helpers/withData';

// import data from '../data/SampleData';

// HomePage.propTypes = {
//   data: PropTypes.shape({
//     loading: PropTypes.bool.isRequired,
//     newsItems: PropTypes.arrayOf(PropTypes.object),
//   }).isRequired,
// };

export default withData(props => (
  <Main>
    <NewsFeedHOC /*newsItems={props.data.newsItems}*/ />
  </Main>
));
