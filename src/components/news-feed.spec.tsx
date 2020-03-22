import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import * as React from 'react';

import { sampleData } from '../data/sample-data';
import { NewsFeed } from './news-feed';

MockDate.set(1506022129802);

describe('NewsFeed component', () => {
  it('renders news items passed in as props', () => {
    const wrapper = shallow(
      <NewsFeed newsItems={sampleData.newsItems} currentUrl="/" first={30} skip={0} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
