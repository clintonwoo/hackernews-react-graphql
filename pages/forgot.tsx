import gql from 'graphql-tag';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { UserLoginErrorCode } from '../src/helpers/user-login-error-code';
import { withDataAndRouter, IWithDataContext } from '../src/helpers/with-data';
import { BlankLayout } from '../src/layouts/blank-layout';

interface IForgotPageProps extends IForgotPageOwnProps {
  registerUser: (id: string, password: string) => void;
}

interface IForgotPageOwnProps {
  router: NextRouter; // { how: UserLoginErrorCode }
}

const ForgotPageView: React.SFC<IForgotPageProps> = ({ registerUser, router }) => {
  let message: string | undefined;
  switch (router && router.query.how) {
    case 'up':
      message = 'You have to be logged in to vote.';
      break;
    default:
      message = undefined;
  }

  let user = '';
  let pass = '';
  const onUserChange = (e): void => {
    user = e.target.value;
  };
  const onPasswordChange = (e): void => {
    pass = e.target.value;
  };

  return (
    <BlankLayout>
      {message && <div>{message}</div>}
      <b>Login</b>
      <br />
      <br />
      <form method="post" action="/login" style={{ marginBottom: '1em' }}>
        <input type="hidden" name="goto" value="news" />
        <table style={{ border: '0px' }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  type="text"
                  name="username"
                  size={20}
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoFocus
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input type="password" name="password" size={20} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="login" />
      </form>
      <Link href="/forgot">
        <a>Forgot your password?</a>
      </Link>
      <br />
      <br />
      <b>Create Account</b>
      <br />
      <br />
      <form
        method="post"
        action="/login"
        /* onSubmit={e => e.preventDefault()} */ style={{ marginBottom: '1em' }}
      >
        <input type="hidden" name="goto" value={`user?id=${user}`} />
        <input type="hidden" name="creating" value="true" />
        <table style={{ border: '0px' }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  type="text"
                  name="username"
                  onChange={onUserChange}
                  size={20}
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input type="password" name="password" onChange={onPasswordChange} size={20} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input
          type="submit"
          value="create account"
          onClick={(): void => registerUser(user, pass)}
        />
      </form>
    </BlankLayout>
  );
};

const registerUserMutation = gql`
  mutation RegisterUser($id: String!, $password: String!) {
    registerUser(id: $id, password: $password) {
      id
      karma
    }
  }
`;

const ForgotPageWithGraphql = graphql<IForgotPageOwnProps, {}, {}, IForgotPageProps>(
  registerUserMutation,
  {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      registerUser: (id: string, password: string): Promise<any> => {
        return (
          mutate!({
            variables: { id, password },
          })
            // .then(() => Router.push(`/login?id=${id}&password=${password}`))
            .catch((reason) => console.error(reason))
        );
      },
      router: ownProps.router,
    }),
  }
)(ForgotPageView);

export const ForgotPage = withDataAndRouter(
  withRouter((props) => <ForgotPageWithGraphql router={props.router} />)
);

export default ForgotPage;
