import { MockedProvider } from '@apollo/react-testing';
import * as React from 'react';
import MockDate from 'mockdate';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { NewsTitle } from './news-title';
import { sampleData } from '../data/sample-data';

MockDate.set(1506022129802);

describe('NewsTitle component', () => {
  // it('shallow renders', () => {
  //   const wrapper = shallow(
  //     <NewsFeed />,
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('renders news item properties passed in as props', () => {
    const wrapper = shallow(
      <MockedProvider>
        <NewsTitle {...sampleData.newsItems[0]} isRankVisible={true} rank={1} />
      </MockedProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  // it('renders news items passed in as props', () => {
  //   const wrapper = shallow((
  //     <NewsFeed newsItems={data.newsItems} />
  //   ));
  //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  // });
});
