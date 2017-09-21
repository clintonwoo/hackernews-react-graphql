import React from 'react';
import { shallow } from 'enzyme';

import Page from '../bestcomments';


describe('Best Comments Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
