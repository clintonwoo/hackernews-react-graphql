import Head from 'next/head';
import * as React from 'react';

export function NoticeLayout(props): JSX.Element {
  const { children } = props;

  return (
    <div>
      <Head>
        <title>Hacker News Clone</title>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/static/yc.css" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <br />
      <br />
      <table style={{ marginLeft: 'auto', marginRight: 'auto', padding: '0px', width: '500px' }}>
        <tbody>
          <tr>
            <td style={{ backgroundColor: '#fafaf0' }}>
              <a href="http://www.ycombinator.com">
                <img alt="" src="/static/yc500.gif" style={{ border: '0px' }} width="500" />
              </a>
              <br />
              <br />
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
