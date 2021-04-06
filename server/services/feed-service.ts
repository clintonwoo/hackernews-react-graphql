import { debug } from 'debug';

import { FeedType, NewsItemModel } from '../../src/data/models';
import { sampleData } from '../../src/data/sample-data';
import { HnCache } from '../database/cache';
import { HnDatabase } from '../database/database';

const logger = debug('app:Feed');
logger.log = console.log.bind(console);

export class FeedService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  public async getForType(
    type: FeedType,
    first: number,
    skip: number
  ): Promise<Array<NewsItemModel | void>> {
    logger('Get first', first, type, 'stories skip', skip);

    switch (type) {
      case FeedType.TOP:
        // In this app the HN data is reconstructed in-memory
        return Promise.all(
          this.cache.top
            .slice(skip, first + skip)
            .map((id) => this.cache.getNewsItem(id) || this.db.fetchNewsItem(id))
        );

      case FeedType.NEW:
        return Promise.all(
          this.cache.new
            .slice(skip, first + skip)
            .map((id) => this.cache.getNewsItem(id) || this.db.fetchNewsItem(id))
        );

      case FeedType.BEST:
        return Promise.all(
          this.cache.best
            .slice(skip, first + skip)
            .map((id) => this.cache.getNewsItem(id) || this.db.fetchNewsItem(id))
        );

      case FeedType.SHOW:
        return this.cache.showNewsItems.slice(skip, first + skip);

      case FeedType.ASK:
        return this.cache.askNewsItems.slice(skip, first + skip);

      case FeedType.JOB:
        return this.cache.jobNewsItems.slice(skip, first + skip);

      default:
        return sampleData.newsItems.slice(skip, skip + first);
    }
  }
}
