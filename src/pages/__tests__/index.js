import { shallow } from 'enzyme';
import React from 'react';

import HomePage from '../index';

describe('Home Page', () => {
  it('is defined', () => {
    const app = shallow(<HomePage serverState={{}} />);
    expect(app).toBeDefined();
  });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<HomePage />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
