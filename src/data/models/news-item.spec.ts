import { NewsItem } from './news-item';

describe('NewsItem Model', () => {
  it('gets a single News Item', () => {
    const id = 1224;
    const newsItem = NewsItem.getNewsItem(id);
    expect(newsItem);
  });
  it('gets multiple News Items', () => {
    const ids = [1224, 1225];
    const newsItems = NewsItem.getNewsItems(ids);
    expect(newsItems);
  });
  it('upvotes a News Item', () => {
    const id = 1224;
    const newsItem = NewsItem.upvoteNewsItem(id);
    expect(newsItem);
  });
  it('submits a new News Item', () => {
    const submitterId = 'clinton';
    const title = 'wow.';
    const url = 'http://www.google.com';
    const newsItem = NewsItem.submitNewsItem({ submitterId, title, url });
    expect(newsItem);
  });
});
