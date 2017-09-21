import React from 'react';
import { shallow } from 'enzyme';

import Page from '../security';


describe('Security Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
