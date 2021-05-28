import Head from 'next/head';
import * as React from 'react';
import { useQuery } from '@apollo/client';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { IMeQuery, ME_QUERY } from '../data/queries/me-query';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import useSound from 'use-sound';
import { useSoundContext } from '../context/state';

interface IMainLayoutProps {
  children: React.ReactChild;
  currentUrl: string;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

export function MainLayout(props: IMainLayoutProps, pageProps: any): JSX.Element {
  const { data } = useQuery<IMeQuery>(ME_QUERY);

  const {
    children,
    currentUrl,
    isNavVisible = true,
    isFooterVisible = true,
    title = 'Hacker News',
  } = props;

  const { state, toggle } = useSoundContext();

  const [playClick] = useSound(
    '/click.mp3',
    { volume: 0.25 }
  );

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if ((event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement) && state) {
      playClick();
    }
  };

  console.log(pageProps);

  return (
    <div onClick={handleClick}>
      <link rel="stylesheet" type="text/css" href="/static/notification.css" />
      <ReactNotification 
        types={[{
          htmlClasses: ["notification-custom"],
          name: "custom"
        }]}
      />

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
            currentUrl={currentUrl}
            isNavVisible={!!isNavVisible}
            me={data?.me}
            title={title!}
          />
          <tr style={{ height: '10px' }} />
          {children}
          {isFooterVisible && <Footer />}
        </tbody>
      </table>
    </div>
  );
}
