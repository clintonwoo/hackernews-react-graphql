import * as React from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export const ChangePasswordPage = withDataAndRouter((props) => (
  <MainLayout currentUrl={props.router.pathname}>
    <h1>Change PW</h1>
  </MainLayout>
));

export default ChangePasswordPage;
