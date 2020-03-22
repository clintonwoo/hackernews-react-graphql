import * as React from 'react';

import { withDataAndRouter } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

export const ChangePasswordPage = withDataAndRouter(props => (
  <MainLayout currentUrl={props.router.pathname}>
    <h1>Change PW</h1>
  </MainLayout>
));

export default ChangePasswordPage;
