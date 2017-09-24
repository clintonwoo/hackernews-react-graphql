import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Blank from '../layouts/Blank';
import withData from '../helpers/withData';


const Page = ({ registerUser, url }) => {
  // const onClick = () => {
  //   props.mutate({
  //     variables: { id: id, password: password }
  //   })
  //     .then(data)
  //     .catch(error)
  // }
  // const registerUser = () => {
  //   registerUser(user, pass)
  // }

  let message;
  switch (url && url.query.how) {
    case 'up':
      message = 'You have to be logged in to vote.';
      break;
    default:
      message = undefined;
  }

  let user = '';
  let pass = '';
  const onUserChange = (e) => { user = e.target.value; };
  const onPasswordChange = (e) => { pass = e.target.value; };
  return (
    <Blank>
      {message && <div>{message}</div>}
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
        <input type="hidden" name="creating" value={true} />
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
                <input type="password" name="password" onChange={onPasswordChange} size="20" />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="create account" onClick={() => registerUser(user, pass)} />
      </form>
    </Blank>
  );
};
Page.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const registerUser = gql`
  mutation RegisterUser($id: String!, $password: String!) {
    registerUser(id: $id, password: $password) {
      id
      karma
    }
  }
`;

const PageWithData = graphql(registerUser, {
  props: ({ ownProps, mutate, url }) => ({
    url,
    registerUser: (id, password) => {
      return mutate({
        variables: { id, password },
      })
      // .then(() => Router.push(`/login?id=${id}&password=${password}`))
        .catch(reason => console.error(reason));
    },
   
  }),
})(Page);

export default withData(props => (
  <PageWithData url={props.url} />
));
