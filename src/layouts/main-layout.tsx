import Head from 'next/head';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { Footer } from '../components/presentational/Footer';
import { Header } from '../components/presentational/Header';
import { meQuery } from '../data/queries/me-query';

interface IMainLayoutProps extends IMainLayoutOwnProps {
  me: {
    id: string;
    karma: number;
  };
}

interface IMainLayoutOwnProps {
  children: React.ReactChild;
  currentURL: string;
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
        <Header
          title={props.title}
          isNavVisible={props.isNavVisible}
          isUserVisible={props.isUserVisible}
          me={props.me}
          currentURL={props.currentURL}
        />
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

export const MainLayout = graphql(meQuery, {
  options: {
    // fetchPolicy: 'cache-and-network',
    // ssr: false,
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(MainLayoutView);
