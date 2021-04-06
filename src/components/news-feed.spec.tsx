/** @jest-environment jsdom */
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import * as React from 'react';

import { sampleData } from '../data/sample-data';
import { NewsFeedView } from './news-feed';

MockDate.set(1506022129802);

describe('NewsFeed component', () => {
  it('renders news items passed in as props', () => {
    const wrapper = render(
      <MockedProvider>
        <NewsFeedView newsItems={sampleData.newsItems} currentUrl="/" first={30} skip={0} />
      </MockedProvider>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
