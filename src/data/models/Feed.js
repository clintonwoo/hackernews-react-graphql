import debug from 'debug';
import * as HNDB from '../HNDataAPI';
import cache from '../Cache';

import sampleData from '../SampleData';

const logger = debug('app:Feed');
logger.log = console.log.bind(console);


class Feed {
  getForType(type, first, skip) {
    logger(`Get first ${first} ${type} stories skip ${skip}.`);
    switch (type) {
      case 'TOP':
        // In this app the HN data is reconstructed in-memory
        return Promise.all(
          this.top.slice(skip, first + skip)
            .map(id => cache.getNewsItem(id) || HNDB.fetchNewsItem(id)));
      case 'NEW':
        return Promise.all(
          this.new.slice(skip, first + skip)
            .map(id => cache.getNewsItem(id) || HNDB.fetchNewsItem(id)));
      case 'BEST':
        return Promise.all(
          this.best.slice(skip, first + skip)
            .map(id => cache.getNewsItem(id) || HNDB.fetchNewsItem(id)));
      case 'SHOW':
        return this.showNewsItems.slice(skip, first + skip);
      case 'ASK':
        return this.askNewsItems.slice(skip, first + skip);
      case 'JOB':
        return this.jobNewsItems.slice(skip, first + skip);
      default:
        return sampleData.newsItems.slice(skip, skip + first);
    }
  }

  /* Arrays of post ids in descending rank order */
  top = sampleData.top;
  new = sampleData.new;
  best = [];
  show = [];
  ask = [];
  job = [];
  
  /* A pre constructed cache of news feeds */
  topNewsItems = sampleData.topStoriesCache;
  newNewsItems = sampleData.topStoriesCache;
  bestNewsItems = sampleData.topStoriesCache;
  showNewsItems = sampleData.topStoriesCache;
  askNewsItems = sampleData.topStoriesCache;
  jobNewsItems = sampleData.topStoriesCache;
}

export default new Feed();
