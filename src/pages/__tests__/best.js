import React from 'react';
import { shallow } from 'enzyme';

import Page from '../newest';


describe('Newest Posts Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
