import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/lists';

describe('Lists Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
