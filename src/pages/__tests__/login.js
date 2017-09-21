import React from 'react';
import { shallow } from 'enzyme';

import Page from '../login';


describe('Login Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
