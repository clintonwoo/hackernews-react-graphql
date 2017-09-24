import React from 'react';

import Main from '../layouts/Main';
import withData from '../helpers/withData';

import data from '../data/SampleData';

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <h1>Change PW</h1>
  </Main>
));
