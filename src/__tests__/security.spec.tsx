import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/security';

describe('Security Page', () => {
  it('is defined', () => {
    const app = shallow(<Page />);

    expect(app).toBeDefined();
  });
});
