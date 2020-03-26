import { shallow } from 'enzyme';
import * as React from 'react';

import Page from '../../pages/ask';

describe('Newest Posts Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);

    expect(app).toBeDefined();
  });
});
