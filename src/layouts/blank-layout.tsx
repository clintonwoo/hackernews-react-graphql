import Head from 'next/head';
import * as React from 'react';

export function BlankLayout(props): JSX.Element {
  const { children } = props;

  return (
    <div className="WordSection1">
      <Head>
        <title>Hacker News Clone</title>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
