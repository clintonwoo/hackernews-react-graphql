import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/front';

describe('Front Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);

    expect(app).toBeDefined();
  });
});
