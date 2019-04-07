import * as React from 'react';
import MockDate from 'mockdate';
import { shallow } from 'enzyme';

import { NewsFeed } from './news-feed';
import { sampleData } from '../data/sample-data';

MockDate.set(1506022129802);

describe('NewsFeed component', () => {
  // it('shallow renders', () => {
  //   const wrapper = shallow(
  //     <NewsFeed />,
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('renders news items passed in as props', () => {
    const wrapper = shallow(<NewsFeed newsItems={sampleData.newsItems} currentUrl="/" first={30} skip={0} />);
    expect(wrapper).toMatchSnapshot();
  });

  // it('renders news items passed in as props', () => {
  //   const wrapper = shallow((
  //     <NewsFeed newsItems={data.newsItems} />
  //   ));
  //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  // });
});
