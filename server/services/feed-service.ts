import { debug } from 'debug';

import { CacheSingleton } from '../database/cache';
import * as HNDB from '../database/hn-data-api';
import { sampleData } from '../../src/data/sample-data';
import { FeedType, NewsItemModel } from '../../src/data/models';

const logger = debug('app:Feed');
logger.log = console.log.bind(console);

export class FeedService {
  public static getForType(
    type: FeedType,
    first: number,
    skip: number
  ): Promise<Array<NewsItemModel | void>> | NewsItemModel[] {
    logger(`Get first ${first} ${type} stories skip ${skip}.`);

    switch (type) {
      case FeedType.TOP:
        // In this app the HN data is reconstructed in-memory
        return Promise.all(
          CacheSingleton.top
            .slice(skip, first + skip)
            .map((id) => CacheSingleton.getNewsItem(id) || HNDB.fetchNewsItem(id))
        );

      case FeedType.NEW:
        return Promise.all(
          CacheSingleton.new
            .slice(skip, first + skip)
            .map((id) => CacheSingleton.getNewsItem(id) || HNDB.fetchNewsItem(id))
        );

      case FeedType.BEST:
        return Promise.all(
          CacheSingleton.best
            .slice(skip, first + skip)
            .map((id) => CacheSingleton.getNewsItem(id) || HNDB.fetchNewsItem(id))
        );

      case FeedType.SHOW:
        return CacheSingleton.showNewsItems.slice(skip, first + skip);

      case FeedType.ASK:
        return CacheSingleton.askNewsItems.slice(skip, first + skip);

      case FeedType.JOB:
        return CacheSingleton.jobNewsItems.slice(skip, first + skip);

      default:
        return sampleData.newsItems.slice(skip, skip + first);
    }
  }
}
