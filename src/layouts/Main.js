import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  graphql,
  gql,
} from 'react-apollo';

import Header from '../components/Header';
import Footer from '../components/Footer';


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
          user={props.me && props.me.id}
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
  user: {
    id: null,
  },
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
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  currentURL: PropTypes.string.isRequired,
};

const me = gql`
query User {
  me {
    id
    karma
  }
}`;

export default graphql(me, {
  options: {
    variables: {
    },
  },
  props: ({ data }) => ({
    data,
  }),
})(Main);

