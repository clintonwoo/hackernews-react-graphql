/** @jest-environment jsdom */
import { MockedProvider } from '@apollo/client/testing';
import * as React from 'react';
import MockDate from 'mockdate';
import { render } from '@testing-library/react';

import { NewsTitle } from './news-title';
import { sampleData } from '../data/sample-data';

MockDate.set(1506022129802);

describe('NewsTitle component', () => {
  it('renders news item properties passed in as props', () => {
    const wrapper = render(
      <MockedProvider>
        <NewsTitle {...sampleData.newsItems[0]} isRankVisible={true} rank={1} />
      </MockedProvider>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
