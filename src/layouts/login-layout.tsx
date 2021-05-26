import Head from 'next/head';
import * as React from 'react';
import { useQuery } from '@apollo/client';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { IMeQuery, ME_QUERY } from '../data/queries/me-query';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

interface IMainLayoutProps {
  children: React.ReactChild;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

export function LoginLayout(props: IMainLayoutProps): JSX.Element {
  const { data } = useQuery<IMeQuery>(ME_QUERY);

  const {
    children,
    isNavVisible = true,
    isFooterVisible = false,
    title = 'Hacker News',
  } = props;

  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 2000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  return (
    <AlertProvider template={AlertTemplate} {...options}>
        <div>
        <ReactNotification />
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
            <Header
                currentUrl='login'
                isNavVisible={!!isNavVisible}
                me={data?.me}
                title={title!}
            />
            <tr style={{ height: '10px' }} />
            {children}
            { <Footer isFooterNotVisible={!isFooterVisible}/>}
            </tbody>
        </table>
        </div>
    </AlertProvider >
  );
}
