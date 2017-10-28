import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Notice = props => (
  <center>
    <Head>
      <title>Hacker News Clone</title>
      <meta name="referrer" content="origin" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" type="text/css" href="/static/yc.css" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
    <br />
    <br />
    <table width="500" style={{ padding: '0px' }}>
      <tbody>
        <tr>
          <td style={{ backgroundColor: '#fafaf0' }}>
            <a href="http://www.ycombinator.com">
              <img alt="" src="/static/yc500.gif" style={{ border: '0px' }} width="500" />
            </a>
            <br />
            <br />
            {props.children}
          </td>
        </tr>
      </tbody>
    </table>
  </center>
);
Notice.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Notice;
