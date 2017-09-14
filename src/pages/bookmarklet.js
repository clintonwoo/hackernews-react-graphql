import React from 'react';
import Link from 'next/link';

import Notice from '../layouts/Notice';

export default props => (
  <Notice>
    <b>Bookmarklet</b>
    <br />
    <br />
    <div id="main">
      <p id="first">
        Thanks to Phil Kast for writing this bookmarklet for submitting
        links to <Link prefetch href="/"><a>Hacker News</a></Link>.
        When you click on the bookmarklet, it will submit the page you&#39;re on.
        To install, drag this link to your browser toolbar:
        <br />
        <br />
      </p>
      <center>
        <a style={{ color: '#777', fontSize: '2em' }} href="javascript:window.location=%22http://news.ycombinator.com/submitlink?u=%22+encodeURIComponent(document.location)+%22&amp;t=%22+encodeURIComponent(document.title)">post to HN</a>
      </center>
      <br />
      <br />
      <table width="100%" style={{ padding: '0px', backgroundColor: '#ff6600' }}>
        <tbody>
          <tr style={{ height: '0px' }} >
            <td style={{ padding: '0px' }} />
          </tr>
        </tbody>
      </table>
      <p style={{ align: 'center' }}>
        <span className="foot">
          <br />
          <br />
        </span>
      </p>
    </div>
  </Notice>
);
