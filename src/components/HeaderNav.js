import React from 'react';
import PropTypes from 'prop-types';

const HeaderNav = props => (
  props.isNavVisible ?
    <span className="pagetop">
      <b className="hnname">
        <a href="news">{props.title}</a>
      </b>
      &nbsp;
      {props.userId && <a href="/newswelcome">welcome</a>}
      {props.userId && ' | '}
      <a href="/newest">new</a>
      {props.userId && ' | '}
      {props.userId && <a href={`/threads?id=${props.userId}`}>threads</a>}
      {' | '}
      <a href="/newcomments">comments</a>
      {' | '}
      <a href="/show">show</a>
      {' | '}
      <a href="/ask">ask</a>
      {' | '}
      <a href="/jobs">jobs</a>
      {' | '}
      <a href="/submit">submit</a>
    </span>
    :
    <span className="pagetop">
      <b className="hnname">
        <a href="news">{props.title}</a>
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
