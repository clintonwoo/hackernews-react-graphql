import * as React from 'react';
import Head from 'next/head';

export const Blank: React.SFC = props => (
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
