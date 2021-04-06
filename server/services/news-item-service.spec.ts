import { NewsItemService } from './news-item-service';

describe('NewsItem Model', () => {
  it('gets a single News Item', () => {
    const id = 1224;
    const newsItem = NewsItemService.getNewsItem(id);

    expect(newsItem).toBeDefined();
  });

  it('gets multiple News Items', () => {
    const ids = [1224, 1225];
    const newsItems = NewsItemService.getNewsItems(ids);

    expect(newsItems).toBeDefined();
  });

  it('upvotes a News Item', () => {
    const id = 1224;
    const userId = 'testuser';
    const newsItem = NewsItemService.upvoteNewsItem(id, userId);

    expect(newsItem).toBeDefined();
  });

  it('submits a new News Item', () => {
    const submitterId = 'clinton';
    const title = 'wow.';
    const url = 'http://www.google.com';
    const text = undefined;
    const newsItem = NewsItemService.submitNewsItem({ submitterId, text, title, url });

    expect(newsItem).toBeDefined();
  });
});
