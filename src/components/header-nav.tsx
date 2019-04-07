import * as React from 'react';
import Link from 'next/link';

interface IHeaderNavProps {
  userId?: string;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export class HeaderNav extends React.Component<IHeaderNavProps> {
  defaultProps = {
    userId: null,
  };

  render(): JSX.Element {
    const props = this.props;

    return props.isNavVisible ? (
      <span className="pagetop">
        <b className="hnname">
          <Link prefetch href="/" as="/news">
            <a>{props.title}</a>
          </Link>
        </b>
        &nbsp;
        {props.userId && (
          <Link prefetch href="/newswelcome">
            <a>welcome</a>
          </Link>
        )}
        {props.userId && ' | '}
        <Link prefetch href="/newest">
          <a className={props.currentUrl === '/newest' ? 'topsel' : ''}>new</a>
        </Link>
        {props.userId && ' | '}
        {props.userId && (
          <Link prefetch href={`/threads?id=${props.userId}`}>
            <a className={props.currentUrl === '/threads' ? 'topsel' : ''}>threads</a>
          </Link>
        )}
        {' | '}
        <Link prefetch href="/newcomments">
          <a className={props.currentUrl === '/newcomments' ? 'topsel' : ''}>comments</a>
        </Link>
        {' | '}
        <Link prefetch href="/show">
          <a className={props.currentUrl === '/show' ? 'topsel' : ''}>show</a>
        </Link>
        {' | '}
        <Link prefetch href="/ask">
          <a className={props.currentUrl === '/ask' ? 'topsel' : ''}>ask</a>
        </Link>
        {' | '}
        <Link prefetch href="/jobs">
          <a className={props.currentUrl === '/jobs' ? 'topsel' : ''}>jobs</a>
        </Link>
        {' | '}
        <Link prefetch href="/submit">
          <a className={props.currentUrl === '/submit' ? 'topsel' : ''}>submit</a>
        </Link>
        {props.currentUrl === '/best' && ' | '}
        {props.currentUrl === '/best' && (
          <Link prefetch href="/best">
            <a className="topsel">best</a>
          </Link>
        )}
      </span>
    ) : (
      <span className="pagetop">
        <b>{props.title}</b>
      </span>
    );
  }
}
