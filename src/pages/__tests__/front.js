import React from 'react';
import { shallow } from 'enzyme';

import Page from '../front';


describe('Front Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
