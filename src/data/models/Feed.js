import debug from 'debug';

import sampleData from '../SampleData';
import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';

const logger = debug('app:Feed');
logger.log = console.log.bind(console);


class Feed {
  getForType(type, first, skip) {
    logger(`Get first ${first} ${type} stories skip ${skip}.`);
    switch (type) {
      case 'HOT': {
        // In this app demo the HN data is preconstructed in-memory
        return this.topNewsItems.slice(skip, first + skip);
      }
      case 'NEW':
        return this.newNewsItems.slice(skip, first + skip);
      case 'TOP':
        if (cache.isReady) return cache.getTopNewsItems(first, skip);
        return DB.getTopNewsItems(first, skip);
      default:
        return sampleData.newsItems.slice(skip, skip + first);
    }
  }

  /* Arrays of post ids in descending rank order */
  top = sampleData.top;
  new = sampleData.new;
  show = [];
  ask = [];
  job = [];
  
  /* A pre constructed cache of news feeds */
  topNewsItems = sampleData.topStoriesCache;
  newNewsItems = sampleData.topStoriesCache;
  showNewsItems = [];
  askNewsItems = [];
  jobNewsItems = [];

  /*                     BEGIN FEED                         */

  getTopNewsItems(first, skip) {
    return this.top.slice(skip, skip + first)
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

  /*                     END FEED                         */
}

export default new Feed();
