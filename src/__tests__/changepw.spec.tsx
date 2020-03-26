import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/changepw';

describe('Change Password Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
