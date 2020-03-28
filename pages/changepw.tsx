import * as React from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export function ChangePasswordPage(props): JSX.Element {
  const { router } = props;

  return (
    <MainLayout currentUrl={router.pathname}>
      <h1>Change PW</h1>
    </MainLayout>
  );
}

export default withDataAndRouter(ChangePasswordPage);
