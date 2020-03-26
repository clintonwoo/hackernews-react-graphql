import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/bookmarklet';

describe('Bookmarklet Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
