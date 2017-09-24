import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import CommentBox from '../CommentBox';
import data from '../../../data/SampleData';


describe('Comment component', () => {
  it('shallow renders', () => {
    const wrapper = shallow(
      <CommentBox {...data.topStoriesCache[0].comments[0]} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a comment passed in as props', () => {
    const wrapper = shallow(
      <CommentBox {...data.topStoriesCache[0].comments[0]} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders at different indentation levels', () => {
    const wrapper = shallow(
      <CommentBox {...data.topStoriesCache[0].comments[0]} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
