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
import { LoginLayout } from '../src/layouts/login-layout';

import useSound from 'use-sound';

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
  const [loginValidationMessage, setLoginValidationMessage] = useState<string>('');
  const [registerValidationMessage, setRegisterValidationMessage] = useState<string>('');
  //const alert = useAlert();

  const [playError] = useSound(
    '/tap2.mp3',
    { volume: 0.25 }
  );

  const validateLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    if (data?.me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        validateNewUser({ id: loginId, password: loginPassword });

      } catch (err) {
        e.preventDefault();
        setLoginValidationMessage(err.message);
        playError();
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
      } catch (err) {
        e.preventDefault();
        setRegisterValidationMessage(err.message);
      }
    }
  };

  return (
    <LoginLayout>
      <div>
        {message && <p style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{message}</p>}
        <br />
        <b style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Login</b>
        <br />
        <br />
        <form
          method="post"
          action="/login"
          onSubmit={(e): void => {
            validateLogin(e);
          }}
          style={{ marginBottom: '2em' }}
        >
          <input type="hidden" name="goto" value={routerQuery.goto || 'news'} />
          <table style={{ display: 'flex',  justifyContent:'center', alignItems:'center', border: '0px' }}>
            <tbody>
              <tr>
                <td>username:</td>
                <td>
                  <input
                    autoCapitalize="off"
                    autoCorrect="off"
                    name="id"
                    onChange={(e): void => {
                      setLoginId(e.target.value);                      
                    }}
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
          {loginValidationMessage && <p style={{ display: 'flex',  justifyContent:'center', alignItems:'center', color: '#f1080e' }}>{loginValidationMessage}</p>}
          <br />
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
            <input type="submit" value="login" />
          </div>
        </form>
        <Link href="/forgot">
          <a style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Forgot your password?</a>
        </Link>
        <br />
        <br />
        <hr></hr>
        <br />
        <br />
        <b style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Create Account</b>
        <br />
        <br />
        <form
          method="post"
          action={`/register`}
          onSubmit={(e): void => {
            validateRegister(e);
          }}
          style={{ marginBottom: '2em' }}
        >
          <table style={{ display: 'flex',  justifyContent:'center', alignItems:'center', border: '0px' }}>
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
              <tr>                
                <td>
                  <input
                    type="text"
                    name="goto"
                    value={routerQuery.goto}  
                    hidden                
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {registerValidationMessage && <p style={{ display: 'flex',  justifyContent:'center', alignItems:'center', color: '#f1080e' }}>{registerValidationMessage}</p>}
          <br />
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
            <input type="submit" value="create account" />
          </div>
          <br />
        </form>
      </div>
    </LoginLayout>
  );
}

export default withDataAndRouter(LoginPage);
