import React from 'react';
import MockDate from 'mockdate';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import NewsDetail from '../NewsDetail';
import data from '../../../data/SampleData';

const newsItem = data.newsItems[0];
// Snapshot will be out of date if we don't use consistent time agoy
// newsItem.creationTime = new Date().valueOf();
MockDate.set(1506022129802);

describe('NewsFeed component', () => {
  it('renders news items passed in as props', () => {
    const hideNewsItem = () => console.log('1');
    const wrapper = shallow(
      <NewsDetail {...newsItem} hideNewsItem={hideNewsItem} isFavoriteVisible={false} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
