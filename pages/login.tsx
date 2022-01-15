import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Router, { NextRouter } from 'next/router';
import React, { useState } from 'react';

import { IMeQuery, ME_QUERY } from '../src/data/queries/me-query';
import { validateNewUser } from '../src/data/validation/user';
import {
  getErrorMessageForLoginErrorCode,
  UserLoginErrorCode,
} from '../src/helpers/user-login-error-code';
import { withDataAndRouter } from '../src/helpers/with-data';
import { BlankLayout } from '../src/layouts/blank-layout';

export interface ILoginPageProps {
  router?: NextRouter;
}

function LoginPage(props: ILoginPageProps): JSX.Element {
  const { data } = useQuery<IMeQuery>(ME_QUERY);

  const { router } = props;

  const routerQuery = router!.query as { how: UserLoginErrorCode; goto: string };
  const message = routerQuery.how ? getErrorMessageForLoginErrorCode(routerQuery.how) : undefined;

  const [loginId, setLoginId] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [registerId, setRegisterId] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  const validateLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    if (data?.me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        validateNewUser({ id: loginId, password: loginPassword });
      } catch (err: any) {
        e.preventDefault();
        setValidationMessage(err.message);
      }
    }
  };

  const validateRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    if (data?.me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        validateNewUser({ id: registerId, password: registerPassword });
      } catch (err: any) {
        e.preventDefault();
        setValidationMessage(err.message);
      }
    }
  };

  return (
    <BlankLayout>
      {message && <p>{message}</p>}
      {validationMessage && <p>{validationMessage}</p>}
      <b>Login</b>
      <br />
      <br />
      <form
        method="post"
        action="/login"
        onSubmit={(e): void => validateLogin(e)}
        style={{ marginBottom: '1em' }}
      >
        <input type="hidden" name="goto" value={routerQuery.goto || 'news'} />
        <table style={{ border: '0px' }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="id"
                  onChange={(e): void => setLoginId(e.target.value)}
                  size={20}
                  spellCheck={false}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td>password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  onChange={(e): void => setLoginPassword(e.target.value)}
                  size={20}
                />
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
        action="/register"
        onSubmit={(e): void => validateRegister(e)}
        style={{ marginBottom: '1em' }}
      >
        <table style={{ border: '0px' }}>
          <tbody>
            <tr>
              <td>username:</td>
              <td>
                <input
                  type="text"
                  name="id"
                  onChange={(e): void => setRegisterId(e.target.value)}
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
                <input
                  type="password"
                  name="password"
                  onChange={(e): void => setRegisterPassword(e.target.value)}
                  size={20}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="create account" />
      </form>
    </BlankLayout>
  );
}

export default withDataAndRouter(LoginPage);
