import { NewsItemModel } from './news-item-model';

describe('NewsItem Model', () => {
  it('gets a single News Item', () => {
    const id = 1224;
    const newsItem = NewsItemModel.getNewsItem(id);

    expect(newsItem);
  });

  it('gets multiple News Items', () => {
    const ids = [1224, 1225];
    const newsItems = NewsItemModel.getNewsItems(ids);

    expect(newsItems);
  });

  it('upvotes a News Item', () => {
    const id = 1224;
    const newsItem = NewsItemModel.upvoteNewsItem(id);

    expect(newsItem);
  });

  it('submits a new News Item', () => {
    const submitterId = 'clinton';
    const title = 'wow.';
    const url = 'http://www.google.com';
    const newsItem = NewsItemModel.submitNewsItem({ submitterId, title, url });

    expect(newsItem);
  });
});
