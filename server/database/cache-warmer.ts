import { debug } from 'debug';

import { FeedType, NewsItemModel } from '../../src/data/models';
import type { FeedService } from '../services/feed-service';
import type { HnCache } from './cache';
import type { HnDatabase } from './database';

const logger = debug('app:cache-warmer');
logger.log = console.log.bind(console);

const FIFTEEN_MINUTES = 1000 * 60 * 15;

export function warmCache(db: HnDatabase, cache: HnCache, feedService: FeedService): void {
  // Fetch the front pages
  feedService.getForType(FeedType.TOP, 30, 0);
  feedService.getForType(FeedType.NEW, 30, 0);

  setTimeout(() => warmCache(db, cache, feedService), FIFTEEN_MINUTES);
}

function rebuildFeed(db: HnDatabase, cache: HnCache, feedType: FeedType): void {
  setTimeout(() => rebuildFeed(db, cache, feedType), 1000 * 60 * 15, feedType);

  db.getFeed(feedType)
    .then((feed) => {
      if (feed) {
        return Promise.all(feed.map((id: number) => db.fetchNewsItem(id))).then((newsItems) => {
          logger(newsItems);

          cache[`${feedType}NewsItems`] = newsItems.filter(
            (newsItem) => newsItem !== undefined && newsItem !== null
          ) as NewsItemModel[];

          cache[feedType] = feed;

          logger('Updated Feed ids for type: ', feedType);
        });
      }

      return undefined;
    })
    .catch((reason) => logger('Error building feed: ', reason));
}

/* END NEWS ITEMS */

/* BEGIN SEED DATA */

export function seedCache(db: HnDatabase, cache: HnCache, delay: number): void {
  logger('Waiting ms before seeding the app with data:', delay);

  // Delay seeding the cache so we don't spam in dev
  setTimeout(() => {
    logger('Seeding cache');

    [FeedType.TOP, FeedType.NEW, FeedType.BEST, FeedType.SHOW, FeedType.ASK, FeedType.JOB].forEach(
      (feedType): void => {
        rebuildFeed(db, cache, feedType);
      }
    );
  }, delay);
}

/*  END SEED DATA */
