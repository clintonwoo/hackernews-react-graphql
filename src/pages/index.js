import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient, ApolloProvider, gql, graphql } from 'react-apollo';

import Main from '../layouts/Main';
import NewsFeed from '../components/NewsFeed';
import withData from '../helpers/withData';

// import data from '../data/SampleData';

// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
// const client = new ApolloClient();

// const HomePage = props => (
//   <ApolloProvider client={client}>
//     <Main>
//       <NewsFeed
//         newsItems={props.data.newsItems}
//       />
//     </Main>
//   </ApolloProvider>
// );
// HomePage.propTypes = {
//   data: PropTypes.shape({
//     loading: PropTypes.bool.isRequired,
//     newsItems: PropTypes.arrayOf(PropTypes.object),
//   }).isRequired,
// };

export default withData(props => {
  return (
  <Main>
    <NewsFeed /*newsItems={props.data.newsItems}*/ />
  </Main>
)});
// export default graphql(gql`
//   query { 
//     newsItems { 
//       id,
//       title,
//       text,
//       url,
//       creationTime,
//       submitterId,
//       commentCount,
//       points,
//     } 
//   }
// `)(HomePage);
