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

interface ILoginPageProps extends Partial<IMeQuery>, ILoginPageOwnProps {}

export interface ILoginPageOwnProps {
  url?: {
    query: {
      how: UserLoginErrorCode;
      goto: string;
    };
  };
}

interface ILoginPageState {
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

class Page extends React.Component<ILoginPageProps, ILoginPageState> {
  public static defaultProps = {
    me: null,
  };

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
    this.setState({
      login: {
        id: e.target.value,
        password: this.state.login.password,
      },
    });
  };

  private onLoginPasswordChange = e => {
    this.setState({
      login: {
        id: this.state.login.id,
        password: e.target.value,
      },
    });
  };

  /* Register New User */
  private onRegisterIDChange = e => {
    this.setState({
      register: {
        id: e.target.value,
        password: this.state.register.password,
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
    if (this.props.me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        isValidNewUser(this.state.login);
      } catch (err) {
        e.preventDefault();
        this.setState({ validationMessage: err.message });
      }
    }
  };

  private validateRegister = e => {
    if (this.props.me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        isValidNewUser(this.state.register);
      } catch (err) {
        e.preventDefault();
        this.setState({ validationMessage: err.message });
      }
    }
  };

  public render(): JSX.Element {
    let message = '';
    if (this.props.url && this.props.url.query.how) {
      message = getUserLoginErrorCodeMessage(this.props.url.query.how);
    }

    return (
      <Blank>
        {message && <p>{message}</p>}
        {this.state.validationMessage && <p>{this.state.validationMessage}</p>}
        <b>Login</b>
        <br />
        <br />
        <form method="post" action="/login" onSubmit={e => this.validateLogin(e)} style={{ marginBottom: '1em' }}>
          <input type="hidden" name="goto" value={(this.props.url && this.props.url.query.goto) || 'news'} />
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
                    autoFocus={true}
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
        <Link prefetch href="/forgot">
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

const PageWithQuery = graphql<ILoginPageProps, IMeQuery, {}, {}>(gql(meQuery), {
  options: {},
  props: ({ data: { me } }) => ({
    me,
  }),
})(Page);

export const LoginPage = withData(props => <PageWithQuery url={props.url} />);

export default LoginPage;
