import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Blank from '../layouts/Blank';
import withData from '../helpers/withData';


const Page = ({ url }) => {
  let message;
  switch (url && url.query.how) {
    case 'up':
      message = 'You have to be logged in to vote.';
      break;
    case 'pw':
      message = 'Incorrect password.';
      break;
    case 'id':
      message = 'Username is taken.';
      break;
    case 'user':
      message = 'Logged in user cannot register a new user.';
      break;
    default:
      message = undefined;
      break;
  }

  let user = '';
  const onUserChange = (e) => { user = e.target.value; };

  return (
    <Blank>
      {message && <p>{message}</p>}
      <b>Login</b>
      <br />
      <br />
      <form method="post" action="/login" style={{ marginBottom: '1em' }}>
        <input type="hidden" name="goto" value="news" />
        <table style={{ border: '0px' }} >
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input type="text" name="username" size="20" autoCorrect="off" spellCheck="false" autoCapitalize="off" autoFocus="true" />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input type="password" name="password" size="20" />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="login" />
      </form>
      <Link prefetch href="/forgot">
        <a>Forgot your password?</a>
      </Link>
      <br />
      <br />
      <b>Create Account</b>
      <br />
      <br />
      <form method="post" action="/login" /* onSubmit={e => e.preventDefault()} */ style={{ marginBottom: '1em' }}>
        <input type="hidden" name="goto" value={`user?id=${user}`} />
        <input type="hidden" name="creating" value />
        <table style={{ border: '0px' }} >
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input type="text" name="username" onChange={onUserChange} size="20" autoCorrect="off" spellCheck="false" autoCapitalize="off" />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input type="password" name="password" size="20" />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="create account" />
      </form>
    </Blank>
  );
};
Page.propTypes = {
  url: PropTypes.shape({
    query: PropTypes.shape(),
  }).isRequired,
};

export default withData(props => (
  <Page url={props.url} />
));
