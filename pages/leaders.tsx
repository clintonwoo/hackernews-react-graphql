import * as React from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export const LeadersPage = withDataAndRouter((props) => (
  <MainLayout currentUrl={props.router.pathname}>
    <span>total</span>
  </MainLayout>
));

export default LeadersPage;
