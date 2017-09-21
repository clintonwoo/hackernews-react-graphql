import React from 'react';
import { shallow } from 'enzyme';

import Page from '../active';


describe('Active Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
