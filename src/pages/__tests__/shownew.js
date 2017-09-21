import React from 'react';
import { shallow } from 'enzyme';

import Page from '../shownew';


describe('Show New Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
