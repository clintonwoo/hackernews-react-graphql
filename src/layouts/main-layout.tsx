import Head from 'next/head';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { meQuery } from '../data/queries/me-query';

interface IMainLayoutProps extends IMainLayoutOwnProps {
  me: {
    id: string;
    karma: number;
  };
}

interface IMainLayoutOwnProps {
  children: React.ReactChild;
  currentUrl: string;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

const MainLayoutView: React.SFC<IMainLayoutProps> = props => (
  <div style={{ textAlign: 'center' }}>
    <Head>
      <title>Hacker News Clone</title>
      <meta name="referrer" content="origin" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" type="text/css" href="/static/news.css" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
    <table
      id="hnmain"
      style={{
        border: '0px',
        padding: '0px',
        borderSpacing: '0px',
        borderCollapse: 'collapse',
        width: '85%',
        backgroundColor: '#f6f6ef',
      }}
    >
      <tbody>
        <Header currentUrl={props.currentUrl} isNavVisible={props.isNavVisible} me={props.me} title={props.title} />
        <tr style={{ height: '10px' }} />
        {props.children}
        {props.isFooterVisible && <Footer />}
      </tbody>
    </table>
  </div>
);
MainLayoutView.defaultProps = {
  isFooterVisible: true,
  isNavVisible: true,
  isUserVisible: true,
  title: 'Hacker News',
  me: null,
};

export const MainLayout = graphql<IMainLayoutOwnProps, IMainLayoutProps, {}, {}>(meQuery, {
  options: {
    // fetchPolicy: 'cache-and-network',
    // ssr: false,
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(MainLayoutView);
