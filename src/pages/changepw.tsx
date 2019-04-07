import * as React from 'react';

import { MainLayout } from '../layouts/main-layout';
import { withData } from '../helpers/with-data';

export const ChangePasswordPage = withData(props => (
  <MainLayout currentUrl={props.url.pathname}>
    <h1>Change PW</h1>
  </MainLayout>
));

export default ChangePasswordPage;
