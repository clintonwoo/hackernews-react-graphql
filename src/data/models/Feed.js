import sampleData from '../SampleData';
import * as DB from '../Database';
import * as HNDB from '../HNDataAPI';
import cache from '../Cache';
import debug from '../../helpers/logger';

class Feed {
  getForType(type, first, skip) {
    switch (type) {
      case 'HOT': {
        return this.hotNewsItems.slice(skip, first + skip);
      }
      case 'NEW':
        if (cache.isReady) return cache.getNewNewsItems(first, skip);
        return DB.getNewNewsItems(first, skip);
      case 'TOP':
        return DB.getTopNewsItems(first, skip);
      default:
        return sampleData.newsItems.slice(skip, skip + first);
    }
  }
  rebuildHotNews() {
    return HNDB.getHotNewsItems()
      .then(topPostIDs => Promise.all(
        topPostIDs.map(id => HNDB.fetchNewsItem(id))
          .then((post) => {
            cache.setNewsItem({
              id: post.id,
              creationTime: post.time * 1000,
              commentCount: post.descendants || 0,
              points: post.score,
              submitterId: post.by,
              title: post.title,
              url: post.url,
            });
            debug(`created Post ${post.id}`);
          }))
        .then((hotNews) => {
          this.hot = topPostIDs;
          this.hotNewsItems = hotNews.map((newsItem, index) => newsItem.rank = index)
        }));
  }
  // rebuildNewNews()

  /* A ranking of the hottest posts */
  hot = sampleData.hot;
  new = sampleData.new;
  hotNewsItems = sampleData.hotStoriesCache;

  /*                     BEGIN FEED                         */

  getHotNewsItems(first, skip) {
    return this.hot.slice(skip, skip + first)
      .map((postId, index) => ({
        ...this.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  getNewNewsItems(first, skip) {
    return this.new.slice(skip, skip + first)
      .map((postId, index) => ({
        ...this.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  getTopNewsItems(first, skip) {
    return this.top.slice(skip, skip + first)
      .map((postId, index) => ({
        ...this.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  /*                     END FEED                         */
}

export default new Feed();
