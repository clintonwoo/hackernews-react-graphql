import { debug } from 'debug';
import * as Firebase from 'firebase';

import { CacheSingleton } from './cache';
import { FeedType } from '../../src/data/models';
import { FeedService } from '../services';
import { fetchNewsItem, getFeed } from './hn-data-api';

const logger = debug('app:cache-warmer');
logger.log = console.log.bind(console);

const FIFTEEN_MINUTES = 1000 * 60 * 15;

export function warmCache(): void {
  // Fetch the front pages
  FeedService.getForType(FeedType.TOP, 30, 0);
  FeedService.getForType(FeedType.NEW, 30, 0);

  setTimeout(warmCache, FIFTEEN_MINUTES);
}

function rebuildFeed(feedType: FeedType): void {
  setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);

  getFeed(feedType)
    .then((feed) => {
      if (feed) {
        return Promise.all(feed.map((id: number) => fetchNewsItem(id))).then((newsItems) => {
          logger(newsItems);

          CacheSingleton[`${feedType}NewsItems`] = newsItems.filter(
            (newsItem) => newsItem !== undefined && newsItem !== null
          );

          CacheSingleton[feedType] = feed;

          logger(`Updated ${feedType} ids`);
        });
      }

      return undefined;
    })
    .catch((reason) => logger(`Error building feed: ${reason}`));
}

/* END NEWS ITEMS */

/* BEGIN SEED DATA */

export function seedCache(delay: number): void {
  logger(`Waiting ${delay} ms before seeding the app with data.`);

  // Delay seeding the cache so we don't spam in dev
  setTimeout(() => {
    logger('Seeding cache');

    [FeedType.TOP, FeedType.NEW, FeedType.BEST, FeedType.SHOW, FeedType.ASK, FeedType.JOB].forEach(
      (feedType): void => {
        rebuildFeed(feedType);
      }
    );
  }, delay);
}

/*  END SEED DATA */
