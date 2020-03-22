import { gql } from 'apollo-server-express';
import Link from 'next/link';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { UserLoginErrorCode } from '../helpers/user-login-error-code';
import { withData, IWithDataContext } from '../helpers/with-data';
import { BlankLayout } from '../layouts/blank-layout';

interface IForgotPageProps extends IForgotPageOwnProps {
  registerUser: (id: string, password: string) => void;
}

interface IForgotPageOwnProps {
  dataContext: IWithDataContext<{ how: UserLoginErrorCode }>;
}

const ForgotPageView: React.SFC<IForgotPageProps> = ({ registerUser, dataContext: url }) => {
  let message: string | undefined;
  switch (url && url.query.how) {
    case 'up':
      message = 'You have to be logged in to vote.';
      break;
    default:
      message = undefined;
  }

  let user = '';
  let pass = '';
  const onUserChange = (e) => {
    user = e.target.value;
  };
  const onPasswordChange = (e) => {
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
      registerUser: (id: string, password: string): Promise<void> => {
        return (
          mutate!({
            variables: { id, password },
          })
            // .then(() => Router.push(`/login?id=${id}&password=${password}`))
            .catch((reason) => console.error(reason))
        );
      },
      dataContext: ownProps.dataContext,
    }),
  }
)(ForgotPageView);

export const ForgotPage = withData((props) => (
  <ForgotPageWithGraphql dataContext={props.dataContext} />
));

export default ForgotPage;
