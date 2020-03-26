import { shallow } from 'enzyme';
import * as React from 'react';

import Page from '../../pages/index';

describe('Home Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);

    expect(app).toBeDefined();
  });
});
