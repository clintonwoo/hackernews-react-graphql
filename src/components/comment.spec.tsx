/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import * as React from 'react';

import { sampleData } from '../data/sample-data';
import { Comment } from './comment';

const comment = sampleData.comments[0];
// Snapshot will be out of date if we don't use consistent time ago for comment
MockDate.set(1506022129802);

describe('Comment component', () => {
  it('renders at different indentation levels', () => {
    const wrapper = render(<Comment {...comment} indentationLevel={0} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
