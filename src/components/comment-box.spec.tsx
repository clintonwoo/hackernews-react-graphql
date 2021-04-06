/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';

import { CommentBox } from './comment-box';
import { sampleData } from '../data/sample-data';

describe('Comment component', () => {
  it('renders at different indentation levels', () => {
    const wrapper = render(<CommentBox {...sampleData.topStoriesCache[0].comments[0]} />);

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
