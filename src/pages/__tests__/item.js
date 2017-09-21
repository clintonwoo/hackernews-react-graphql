import React from 'react';
import { shallow } from 'enzyme';

import Page from '../item';


describe('News Item Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
