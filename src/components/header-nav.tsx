import Link from 'next/link';
import * as React from 'react';

interface IHeaderNavProps {
  userId?: string;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export function HeaderNav(props: IHeaderNavProps): JSX.Element {
  const { userId, currentUrl, isNavVisible, title } = props;

  return isNavVisible ? (
    <span className="pagetop">
      <b className="hnname">
        <Link href="/" as="/news">
          <a>{title}</a>
        </Link>
      </b>
      &nbsp;
      {userId && (
        <Link href="/newswelcome">
          <a>welcome</a>
        </Link>
      )}
      {userId && ' | '}
      <Link href="/newest">
        <a className={currentUrl === '/newest' ? 'topsel' : ''}>new</a>
      </Link>
      {userId && ' | '}
      {userId && (
        <Link href={`/threads?id=${userId}`}>
          <a className={currentUrl === '/threads' ? 'topsel' : ''}>threads</a>
        </Link>
      )}
      {' | '}
      <Link href="/newcomments">
        <a className={currentUrl === '/newcomments' ? 'topsel' : ''}>comments</a>
      </Link>
      {' | '}
      <Link href="/show">
        <a className={currentUrl === '/show' ? 'topsel' : ''}>show</a>
      </Link>
      {' | '}
      <Link href="/ask">
        <a className={currentUrl === '/ask' ? 'topsel' : ''}>ask</a>
      </Link>
      {' | '}
      <Link href="/jobs">
        <a className={currentUrl === '/jobs' ? 'topsel' : ''}>jobs</a>
      </Link>
      {' | '}
      <Link href="/submit">
        <a className={currentUrl === '/submit' ? 'topsel' : ''}>submit</a>
      </Link>
      {currentUrl === '/best' && ' | '}
      {currentUrl === '/best' && (
        <Link href="/best">
          <a className="topsel">best</a>
        </Link>
      )}
    </span>
  ) : (
    <span className="pagetop">
      <b>{title}</b>
    </span>
  );
}

HeaderNav.defaultProps = {
  userId: null,
};
