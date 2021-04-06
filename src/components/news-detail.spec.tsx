/** @jest-environment jsdom */
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import * as React from 'react';

import { sampleData } from '../data/sample-data';
import { NewsDetail } from './news-detail';

const newsItem = sampleData.newsItems[0];
// Snapshot will be out of date if we don't use consistent time ago
// newsItem.creationTime = new Date().valueOf();
MockDate.set(1506022129802);

describe('NewsFeed component', () => {
  it('renders news items passed in as props', () => {
    const wrapper = render(
      <MockedProvider>
        <NewsDetail {...newsItem} isFavoriteVisible={false} />
      </MockedProvider>
    );

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
