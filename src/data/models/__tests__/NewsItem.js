import NewsItem from '../NewsItem';

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

// NewsItem.getNewsItem(id) {
//     return cache.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id);
//   }
//   NewsItem.getNewsItems(ids) {
//     return Promise.all(ids.map(id => NewsItem.getNewsItem(id)))
//       .then(newsItems => newsItems.filter(newsItem => newsItem !== undefined))
//       .catch(reason => logger(`Rejected News Items: ${reason}`));
//   }
  
//   NewsItem.upvoteNewsItem(id) {
//     return DB.upvoteNewsItem(id);
//   }

//   NewsItem.submitNewsItem({ submitterId, text, url }) {
//     const newsItem = {
//       id: newPostIdCounter += 1,
//       comments: [],
//       commentCount: 0,
//       creationTime: new Date().valueOf(),
//       hides: [],
//       hiddenCount: 0,
//       submitterId,
//       text: text || null,
//       url: url || null,
//       upvotes: [submitterId],
//       upvoteCount: 1,
//     };
//     return DB.submitNewsItem(newsItem.id, newsItem);
//   }
// }
