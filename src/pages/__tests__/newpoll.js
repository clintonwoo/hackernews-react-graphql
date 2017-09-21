import React from 'react';
import { shallow } from 'enzyme';

import Page from '../newpoll';


describe('New Poll Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
