import data from '../SampleData';
import * as DB from '../Database';

export default class Feed {
  getForType(type, first, skip) {
    switch (type) {
      case 'HOT':
        return this.getHotStories(first, skip);
      case 'NEW':
        return this.getNewStories(first, skip);
      case 'TOP':
        return this.getTopStories(first, skip);
      default:
        return data.newsItems.slice(skip, skip + first);
    }
  }
  getHotStories(first, skip) {
    return data.hot.slice(skip, skip + first)
      .map((postId, index) => ({
        ...DB.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  getNewStories(first, skip) {
    return data.new.slice(skip, skip + first)
      .map((postId, index) => ({
        ...DB.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  getTopStories(first, skip) {
    return data.newsItems.slice(skip, skip + first);
  }
}
