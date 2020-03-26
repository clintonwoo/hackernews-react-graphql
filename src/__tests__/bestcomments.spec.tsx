import * as React from 'react';
import { shallow } from 'enzyme';

import BestCommentsPage from '../../pages/bestcomments';

describe('Best Comments Page', () => {
  it('is defined', () => {
    const app = shallow(<BestCommentsPage serverState={{}} />);
    expect(app).toBeDefined();
  });
});
