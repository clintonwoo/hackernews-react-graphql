import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/newsfaq';

describe('FAQ Page', () => {
  it('is defined', () => {
    const app = shallow(<Page />);

    expect(app).toBeDefined();
  });
});
