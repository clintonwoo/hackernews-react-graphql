import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Blank = props => (
  <div className="WordSection1">
    <Head>
      <title>Hacker News Clone</title>
      <meta name="referrer" content="origin" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
    {props.children}
  </div>
);
Blank.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Blank;
