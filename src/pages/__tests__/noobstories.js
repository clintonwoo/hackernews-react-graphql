import React from 'react';
import { shallow } from 'enzyme';

import Page from '../noobstories';


describe('Noob Stories Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
