import Link from 'next/link';
import * as React from 'react';

interface IHeaderNavProps {
  userId?: string;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export class HeaderNav extends React.Component<IHeaderNavProps> {
  static defaultProps = {
    userId: null,
  };

  render(): JSX.Element {
    const props = this.props;

    return props.isNavVisible ? (
      <span className="pagetop">
        <b className="hnname">
          <Link href="/" as="/news">
            <a>{props.title}</a>
          </Link>
        </b>
        &nbsp;
        {props.userId && (
          <Link href="/newswelcome">
            <a>welcome</a>
          </Link>
        )}
        {props.userId && ' | '}
        <Link href="/newest">
          <a className={props.currentUrl === '/newest' ? 'topsel' : ''}>new</a>
        </Link>
        {props.userId && ' | '}
        {props.userId && (
          <Link href={`/threads?id=${props.userId}`}>
            <a className={props.currentUrl === '/threads' ? 'topsel' : ''}>threads</a>
          </Link>
        )}
        {' | '}
        <Link href="/newcomments">
          <a className={props.currentUrl === '/newcomments' ? 'topsel' : ''}>comments</a>
        </Link>
        {' | '}
        <Link href="/show">
          <a className={props.currentUrl === '/show' ? 'topsel' : ''}>show</a>
        </Link>
        {' | '}
        <Link href="/ask">
          <a className={props.currentUrl === '/ask' ? 'topsel' : ''}>ask</a>
        </Link>
        {' | '}
        <Link href="/jobs">
          <a className={props.currentUrl === '/jobs' ? 'topsel' : ''}>jobs</a>
        </Link>
        {' | '}
        <Link href="/submit">
          <a className={props.currentUrl === '/submit' ? 'topsel' : ''}>submit</a>
        </Link>
        {props.currentUrl === '/best' && ' | '}
        {props.currentUrl === '/best' && (
          <Link href="/best">
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
