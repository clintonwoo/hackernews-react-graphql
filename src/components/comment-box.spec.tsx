import * as React from 'react';
import { shallow } from 'enzyme';

import { CommentBox } from './comment-box';
import { sampleData } from '../data/sample-data';

describe('Comment component', () => {
  it('shallow renders', () => {
    const wrapper = shallow(<CommentBox {...sampleData.topStoriesCache[0].comments[0]} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a comment passed in as props', () => {
    const wrapper = shallow(<CommentBox {...sampleData.topStoriesCache[0].comments[0]} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders at different indentation levels', () => {
    const wrapper = shallow(<CommentBox {...sampleData.topStoriesCache[0].comments[0]} />);

    expect(wrapper).toMatchSnapshot();
  });
});
