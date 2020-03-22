import * as React from 'react';

import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

export const ChangePasswordPage = withData((props) => (
  <MainLayout currentUrl={props.dataContext.pathname}>
    <h1>Change PW</h1>
  </MainLayout>
));

export default ChangePasswordPage;
