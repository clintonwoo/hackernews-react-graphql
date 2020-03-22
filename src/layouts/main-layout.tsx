import { gql } from 'apollo-server-express';
import Head from 'next/head';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { IMeQuery, meQuery } from '../data/queries/me-query';

interface IMainLayoutProps extends Partial<IMeQuery>, IMainLayoutOwnProps {}

interface IMainLayoutOwnProps {
  children: React.ReactChild;
  currentUrl: string;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

const MainLayoutView: React.SFC<IMainLayoutProps> = (props) => (
  <div>
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
        backgroundColor: '#f6f6ef',
        border: '0px',
        borderCollapse: 'collapse',
        borderSpacing: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0px',
        width: '85%',
      }}
    >
      <tbody>
        <Header currentUrl={props.currentUrl} isNavVisible={!!props.isNavVisible} me={props.me} title={props.title!} />
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
  me: undefined,
  title: 'Hacker News',
};

export const MainLayout = graphql<IMainLayoutOwnProps, IMeQuery, {}, IMainLayoutProps>(gql(meQuery), {
  props: ({ ownProps, data }) => ({
    ...ownProps,
    me: data?.me,
  }),
})(MainLayoutView);
