import { NextRouter } from 'next/router';
import React, { useState } from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { BlankLayout } from '../src/layouts/blank-layout';

export interface IForgotPageProps {
  router: NextRouter; // { how: UserLoginErrorCode }
}

function ForgotPage(props: IForgotPageProps): JSX.Element {
  const [username, setUsername] = useState<string>('');

  return (
    <BlankLayout>
      <b>Reset your password</b>
      <br />
      <br />
      <form method="post" action="/x">
        <input type="hidden" name="fnid" value="SW3mxENlH7rdjgxwWaobR5" />
        <input type="hidden" name="fnop" value="forgot-password" />
        username:{' '}
        <input type="text" name="s" size={20} onChange={(e): void => setUsername(e.target.value)} />
        <br />
        <br />
        <input type="submit" value="Send reset email" />
      </form>
    </BlankLayout>
  );
}

export default withDataAndRouter(ForgotPage);
