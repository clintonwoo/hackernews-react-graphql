import app from '../server';

describe('Web server', () => {
  // it('shallow renders', () => {
  //   const wrapper = shallow(
  //     <NewsFeed />,
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });
  it('exists', () => {
    expect(app).toBeDefined();
  });
});
