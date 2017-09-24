import React from 'react';
import MockDate from 'mockdate';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import NewsFeed from '../NewsFeed';
import data from '../../../data/SampleData';

MockDate.set(1506022129802);


describe('NewsFeed component', () => {
  // it('shallow renders', () => {
  //   const wrapper = shallow(
  //     <NewsFeed />,
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });
  it('renders news items passed in as props', () => {
    const wrapper = shallow((
      <NewsFeed newsItems={data.newsItems} currentURL="/" first={30} skip={0} />
    ));
    expect(wrapper).toMatchSnapshot();
  });
  // it('renders news items passed in as props', () => {
  //   const wrapper = shallow((
  //     <NewsFeed newsItems={data.newsItems} />
  //   ));
  //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  // });
});
