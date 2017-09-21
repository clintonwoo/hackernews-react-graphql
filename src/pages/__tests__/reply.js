import React from 'react';
import { shallow } from 'enzyme';

import Page from '../reply';


describe('Reply Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
