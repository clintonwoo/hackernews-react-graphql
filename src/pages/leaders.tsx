import * as React from 'react';

import { MainLayout } from '../layouts/main-layout';
import { withData } from '../helpers/with-data';

export const LeadersPage = withData(props => (
  <MainLayout currentUrl={props.url.pathname}>
    <span>total</span>
  </MainLayout>
));

export default LeadersPage;
