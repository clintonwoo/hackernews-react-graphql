import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/show';

describe('Show Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);

    expect(app).toBeDefined();
  });
});
