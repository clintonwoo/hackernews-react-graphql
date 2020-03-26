import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/newsguidelines';

describe('Guidelines Page', () => {
  it('is defined', () => {
    const app = shallow(<Page />);

    expect(app).toBeDefined();
  });
});
