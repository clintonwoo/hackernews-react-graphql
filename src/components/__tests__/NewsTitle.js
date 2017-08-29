import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import NewsTitle from '../NewsTitle';
import data from '../../data/SampleData';


describe('NewsTitle component', () => {
  // it('shallow renders', () => {
  //   const wrapper = shallow(
  //     <NewsFeed />,
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });
  it('renders news item properties passed in as props', () => {
    const wrapper = shallow((
      <NewsTitle {...data.newsItems[0]} rankVisible={true} />
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
