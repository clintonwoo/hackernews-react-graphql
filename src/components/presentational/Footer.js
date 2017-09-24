import React from 'react';
import Link from 'next/link';

const Footer = props => (
  <tr>
    <td style={{ padding: '0px' }}>
      <img alt="" src="/static/s.gif" height="10" width="0" />
      <table style={{ height: '2px', width: '100%', borderSpacing: '0px' }}>
        <tbody>
          <tr>
            <td style={{ backgroundColor: '#ff6600' }} />
          </tr>
        </tbody>
      </table>
      <br />
      <center>
        <span className="yclinks">
          <a href="/newsguidelines">Guidelines</a>
          &nbsp;| <Link prefetch href="/newsfaq"><a>FAQ</a></Link>
          &nbsp;| <a href="mailto:hn@ycombinator.com">Support</a>
          &nbsp;| <a href="https://github.com/HackerNews/API">API</a>
          &nbsp;| <Link prefetch href="/security"><a>Security</a></Link>
          &nbsp;| <Link prefetch href="/lists"><a>Lists</a></Link>
          &nbsp;| <Link prefetch href="/bookmarklet"><a>Bookmarklet</a></Link>
          &nbsp;| <Link prefetch href="/dmca"><a>DMCA</a></Link>
          &nbsp;| <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
          &nbsp;| <a href="mailto:hn@ycombinator.com">Contact</a>
        </span>
        <br />
        <br />
        <form method="get" action="//hn.algolia.com/" style={{ marginBottom: '1em' }} >Search:
          <input type="text" name="q" value="" size="17" autoCorrect="off" spellCheck="false" autoCapitalize="off" autoComplete="false" /></form>
      </center>
    </td>
  </tr>
);

export default Footer;
