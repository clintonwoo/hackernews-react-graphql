import * as React from 'react';

import { MainLayout } from '../layouts/main-layout';
import { withData } from '../helpers/with-data';

export default withData(props => (
  <MainLayout currentURL={props.url.pathname}>
    <span>total</span>
  </MainLayout>
));
