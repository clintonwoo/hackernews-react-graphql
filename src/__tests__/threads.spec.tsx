import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/threads';

describe('Threads Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
    expect(app).toBeDefined();
  });
});
