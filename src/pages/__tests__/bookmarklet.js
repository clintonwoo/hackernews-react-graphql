import React from 'react';
import { shallow } from 'enzyme';

import Page from '../bookmarklet';


describe('Bookmarklet Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
