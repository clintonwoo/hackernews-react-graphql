import * as React from 'react';

import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

export const FrontPage = withData((props) => (
  <MainLayout currentUrl={props.dataContext.pathname}>
    <span>total</span>
  </MainLayout>
));

export default FrontPage;
