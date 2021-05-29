import { NextRouter } from 'next/router';
import React, { useState } from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { LoginLayout } from '../src/layouts/login-layout';

import useSound from 'use-sound';
import { useSoundContext } from '../src/context/state';

export interface IForgotPageProps {
  router: NextRouter; // { how: UserLoginErrorCode }
}

function ForgotPage(props: IForgotPageProps): JSX.Element {
  const [username, setUsername] = useState<string>('');

  const { state } = useSoundContext();
  const [playActive] = useSound(
    '/click.mp3',
    { volume: 0.5 }
  );
  const handleSubmit = (form) => {
    if (state) {
      playActive();
    }
    form.submit();
  };

  return (
    <LoginLayout>
      <div>
        <b style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Reset your password</b>
        <br />
        <br />
        <form method="post" action="/x" onSubmit={handleSubmit}>
          <input type="hidden" name="fnid" value="SW3mxENlH7rdjgxwWaobR5" />
          <input type="hidden" name="fnop" value="forgot-password" />
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} > username:{' '} 
            <input type="text" name="s" size={20} onChange={(e): void => setUsername(e.target.value)} />
          </div>
          <br />
          <br />
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <input type="submit" value="Send reset email" />
          </div>
        </form>
      </div>
    </LoginLayout>
  );
}

export default withDataAndRouter(ForgotPage);
