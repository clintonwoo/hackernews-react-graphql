import { debug } from 'debug';

import { cache } from '../database/cache';
import * as HNDB from '../database/hn-data-api';
import { sampleData } from '../../src/data/sample-data';
import { FeedType, NewsItemModel } from '../../src/data/models';

const logger = debug('app:Feed');
logger.log = console.log.bind(console);

class Feed {
  /* Arrays of post ids in descending rank order */
  [FeedType.TOP]: number[] = sampleData.top;

  [FeedType.NEW]: number[] = sampleData.new;

  [FeedType.BEST]: number[] = [];

  [FeedType.SHOW]: number[] = [];

  [FeedType.ASK]: number[] = [];

  [FeedType.JOB]: number[] = [];

  /* A pre constructed cache of news feeds */
  topNewsItems = sampleData.topStoriesCache;

  newNewsItems = sampleData.topStoriesCache;

  bestNewsItems = sampleData.topStoriesCache;

  showNewsItems = sampleData.topStoriesCache;

  askNewsItems = sampleData.topStoriesCache;

  jobNewsItems = sampleData.topStoriesCache;

  public getForType(
    type: FeedType,
    first: number,
    skip: number
  ): Promise<Array<NewsItemModel | void>> | NewsItemModel[] {
    logger(`Get first ${first} ${type} stories skip ${skip}.`);

    switch (type) {
      case FeedType.TOP:
        // In this app the HN data is reconstructed in-memory
        return Promise.all(
          this.top
            .slice(skip, first + skip)
            .map((id) => cache.getNewsItem(id) || HNDB.fetchNewsItem(id))
        );

      case FeedType.NEW:
        return Promise.all(
          this.new
            .slice(skip, first + skip)
            .map((id) => cache.getNewsItem(id) || HNDB.fetchNewsItem(id))
        );

      case FeedType.BEST:
        return Promise.all(
          this.best
            .slice(skip, first + skip)
            .map((id) => cache.getNewsItem(id) || HNDB.fetchNewsItem(id))
        );

      case FeedType.SHOW:
        return this.showNewsItems.slice(skip, first + skip);

      case FeedType.ASK:
        return this.askNewsItems.slice(skip, first + skip);

      case FeedType.JOB:
        return this.jobNewsItems.slice(skip, first + skip);

      default:
        return sampleData.newsItems.slice(skip, skip + first);
    }
  }
}

export const FeedSingleton = new Feed();
