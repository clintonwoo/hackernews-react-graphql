import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const HeaderNav = props => (
  props.isNavVisible ?
    <span className="pagetop">
      <b className="hnname">
        <Link prefetch href="/news">
          <a>{props.title}</a>
        </Link>
      </b>
      &nbsp;
      {props.userId && <Link prefetch href="/newswelcome"><a>welcome</a></Link>}
      {props.userId && ' | '}
      <Link prefetch href="/newest">
        <a>new</a>
      </Link>
      {props.userId && ' | '}
      {props.userId && <Link prefetch href={`/threads?id=${props.userId}`}><a>threads</a></Link>}
      {' | '}
      <Link prefetch href="/newcomments">
        <a>comments</a>
      </Link>
      {' | '}
      <Link prefetch href="/show">
        <a>show</a>
      </Link>
      {' | '}
      <Link prefetch href="/ask">
        <a>ask</a>
      </Link>
      {' | '}
      <Link prefetch href="/jobs">
        <a>jobs</a>
      </Link>
      {' | '}
      <Link prefetch href="/submit">
        <a>submit</a>
      </Link>
    </span>
    :
    <span className="pagetop">
      <b className="hnname">
        <Link prefetch href="/news">
          <a>{props.title}</a>
        </Link>
      </b>
    </span>
);
HeaderNav.defaultProps = {
  userId: null,
};
HeaderNav.propTypes = {
  userId: PropTypes.string,
  isNavVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeaderNav;
