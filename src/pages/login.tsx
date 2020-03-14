import { gql } from 'apollo-server-express';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { IMeQuery, meQuery } from '../data/queries/me-query';
import { isValidNewUser } from '../data/validation/user';
import { getUserLoginErrorCodeMessage, UserLoginErrorCode } from '../helpers/user-login-error-code';
import { withData } from '../helpers/with-data';
import { Blank } from '../layouts/blank';

export interface ILoginPageProps extends Partial<IMeQuery>, ILoginPageOwnProps {}

export interface ILoginPageOwnProps {
  url?: {
    query: {
      how: UserLoginErrorCode;
      goto: string;
    };
  };
}

export interface ILoginPageState {
  login: {
    id: string;
    password: string;
  };
  register: {
    id: string;
    password: string;
  };
  validationMessage: string;
}

class LoginPageView extends React.Component<ILoginPageProps, ILoginPageState> {
  public state: ILoginPageState = {
    login: {
      id: '',
      password: '',
    },
    register: {
      id: '',
      password: '',
    },
    validationMessage: '',
  };

  /* Login User */
  private onLoginIDChange = e => {
    const { login } = this.state;

    this.setState({
      login: {
        id: e.target.value,
        password: login.password,
      },
    });
  };

  private onLoginPasswordChange = e => {
    const { login } = this.state;

    this.setState({
      login: {
        id: login.id,
        password: e.target.value,
      },
    });
  };

  /* Register New User */
  private onRegisterIDChange = e => {
    const { register } = this.state;

    this.setState({
      register: {
        id: e.target.value,
        password: register.password,
      },
    });
  };

  private onRegisterPasswordChange = e => {
    this.setState({
      register: {
        id: this.state.register.id,
        password: e.target.value,
      },
    });
  };

  private validateLogin = e => {
    const { me } = this.props;
    const { login } = this.state;

    if (me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        isValidNewUser(login);
      } catch (err) {
        e.preventDefault();
        this.setState({ validationMessage: err.message });
      }
    }
  };

  private validateRegister = e => {
    const { me } = this.props;
    const { register } = this.state;

    if (me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        isValidNewUser(register);
      } catch (err) {
        e.preventDefault();
        this.setState({ validationMessage: err.message });
      }
    }
  };

  public render(): JSX.Element {
    const { url } = this.props;
    const { validationMessage } = this.state;

    let message = '';
    if (url && url.query.how) {
      message = getUserLoginErrorCodeMessage(url.query.how);
    }

    return (
      <Blank>
        {message && <p>{message}</p>}
        {validationMessage && <p>{validationMessage}</p>}
        <b>Login</b>
        <br />
        <br />
        <form method="post" action="/login" onSubmit={e => this.validateLogin(e)} style={{ marginBottom: '1em' }}>
          <input type="hidden" name="goto" value={(url && url.query.goto) || 'news'} />
          <table style={{ border: '0px' }}>
            <tbody>
              <tr>
                <td>username:</td>
                <td>
                  <input
                    type="text"
                    name="id"
                    onChange={this.onLoginIDChange}
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
                  <input type="password" name="password" onChange={this.onLoginPasswordChange} size={20} />
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
        <form method="post" action="/register" onSubmit={e => this.validateRegister(e)} style={{ marginBottom: '1em' }}>
          <table style={{ border: '0px' }}>
            <tbody>
              <tr>
                <td>username:</td>
                <td>
                  <input
                    type="text"
                    name="id"
                    onChange={this.onRegisterIDChange}
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
                  <input type="password" name="password" onChange={this.onRegisterPasswordChange} size={20} />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <input type="submit" value="create account" />
        </form>
      </Blank>
    );
  }
}

const PageWithQuery = graphql<ILoginPageOwnProps, IMeQuery, {}, ILoginPageProps>(gql(meQuery), {
  options: {},
  props: ({ ownProps, data }) => ({
    ...ownProps,
    me: data?.me,
  }),
})(LoginPageView);

export const LoginPage = withData(props => <PageWithQuery url={props.url} />);

export default LoginPage;
