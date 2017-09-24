import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  graphql,
  gql,
} from 'react-apollo';

import Header from '../components/presentational/Header';
import Footer from '../components/presentational/Footer';


const Main = props => (
  <center>
    <Head>
      <title>Hacker News Clone</title>
      <meta name="referrer" content="origin" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" type="text/css" href="/static/news.css" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
    <table id="hnmain" style={{ border: '0px', padding: '0px', borderSpacing: '0px', borderCollapse: 'collapse', width: '85%', backgroundColor: '#f6f6ef' }}>
      <tbody>
        <Header
          title={props.title}
          isNavVisible={props.isNavVisible}
          isUserVisible={props.isUserVisible}
          me={props.me}
          currentURL={props.currentURL}
        />
        <tr style={{ height: '10px' }} />
        { props.children }
        { props.isFooterVisible && <Footer /> }
      </tbody>
    </table>
  </center>
);
Main.defaultProps = {
  isFooterVisible: true,
  isNavVisible: true,
  isUserVisible: true,
  title: 'Hacker News',
  me: null,
};
Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  isNavVisible: PropTypes.bool,
  isUserVisible: PropTypes.bool,
  isFooterVisible: PropTypes.bool,
  title: PropTypes.string,
  me: PropTypes.shape({
    id: PropTypes.string,
    karma: PropTypes.number,
  }),
  currentURL: PropTypes.string.isRequired,
};

const meQuery = gql`
  query User {
    me {
      id
      karma
    }
  }
`;

export default graphql(meQuery, {
  options: {
    // fetchPolicy: 'cache-and-network',
    // ssr: false,
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(Main);

