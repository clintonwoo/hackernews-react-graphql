import * as React from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export function FrontPage(props): JSX.Element {
  const { router } = props;
  return (
    <MainLayout currentUrl={router.pathname}>
      <span>total</span>
    </MainLayout>
  );
}

export default withDataAndRouter(FrontPage);
