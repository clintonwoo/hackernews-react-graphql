import Head from 'next/head';
import * as React from 'react';


import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark';


export function BlankLayout(props): JSX.Element {
  const { children } = props;

  // optional configuration
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div className="WordSection1">

        <Head>
          <title>Hacker News Clone</title>
          <meta name="referrer" content="origin" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
        </Head>
        {children}

      </div>
    </AlertProvider >
  );
}
