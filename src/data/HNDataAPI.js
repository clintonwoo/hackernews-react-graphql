import Firebase from 'firebase';
import debug from 'debug';

import cache from './Cache';
import {
  HN_API_URL,
  HN_DB_URI,
  HN_API_VERSION,
} from '../config';
import {
  Feed,
} from './models';

const logger = debug('app:HNDataAPI');
logger.log = console.log.bind(console);

Firebase.initializeApp({
  databaseURL: HN_DB_URI,
});
const api = Firebase.database().ref(HN_API_VERSION);


// https://github.com/HackerNews/API

/* BEGIN NEWS ITEMS */


export function fetchNewsItem(id) {
  logger(`Fetching post ${HN_API_URL}/item/${id}.json`);
  return api.child(`item/${id}`).once('value')
    .then((postSnapshot) => {
      const post = postSnapshot.val();
      if (post !== null) {
        const newsItem = {
          id: post.id,
          creationTime: post.time * 1000,
          commentCount: post.descendants || 0,
          comments: post.kids || [],
          points: post.score,
          submitterId: post.by,
          title: post.title,
          url: post.url,
        };
        cache.setNewsItem(newsItem.id, newsItem);
        logger(`Created Post: ${post.id}`);
        return newsItem;
      }
      throw post;
    })
    .catch(reason => logger(`Fetching news item failed: ${reason}`));
}

export function fetchComment(id) {
  logger(`Fetching comment ${HN_API_URL}/item/${id}.json`);
  return api.child(`item/${id}`).once('value')
    .then((itemSnapshot) => {
      const item = itemSnapshot.val();
      if (item !== null && !item.deleted && !item.dead) {
        const comment = {
          id: item.id,
          creationTime: item.time * 1000,
          comments: item.kids || [],
          parent: item.parent,
          submitterId: item.by,
          text: item.text,
        };
        cache.setComment(comment.id, comment);
        logger(`Created Comment: ${item.id}`);
        return comment;
      }
      throw item;
    })
    .catch(reason => logger(`Fetching comment failed: ${reason}`));
}

export function getFeed(feedType) {
  logger(`Fetching /${feedType}stories.json`);
  return api.child(`${feedType}stories`).once('value')
    .then(feedSnapshot => feedSnapshot.val())
    .then(feed => feed.filter(newsItem => newsItem !== undefined))
    .catch(reason => logger(`Fetching news feed failed: ${reason}`));
}

const rebuildFeed = (feedType) => {
  setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);
  getFeed(feedType)
    .then(feed => Promise.all(feed.map(id => fetchNewsItem(id)))
      .then((newsItems) => {
        logger(newsItems);
        Feed[`${feedType}NewsItems`] = newsItems;
        Feed[feedType] = feed;
        logger(`Updated ${feedType} ids`);
      }),
    )
    .catch(reason => logger(`Error building feed: ${reason}`));
};

/* END NEWS ITEMS */

/* BEGIN SEED DATA */


export function seedCache(delay) {
  logger(`Waiting ${delay} ms before seeding the app with data.`);
  setTimeout(() => {
    logger('Seeding cache');
    ['top', 'new', 'show', 'ask', 'job'].forEach((feedType) => {
      rebuildFeed(feedType);
    });
  }, delay);
  // Delay seeding the cache so we don't spam in dev
}

/*  END SEED DATA */
