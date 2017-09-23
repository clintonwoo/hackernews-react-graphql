import { shallow } from 'enzyme';
import React from 'react';

import Page from '../index';

describe('Home Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);
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
