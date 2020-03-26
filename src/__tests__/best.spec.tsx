import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/best';

describe('Best Posts Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
