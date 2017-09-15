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
  logger(`Fetching ${HN_API_URL}/item/${id}.json`);

  return new Promise((resolve, reject) => {
    api.child(`item/${id}`).once('value', (postSnapshot) => {
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
        cache.setNewsItem(newsItem);
        logger(`Created Post: ${post.id}`);
        resolve(newsItem);
      } else {
        reject(post);
      }
    }, reject);
  });

  // return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  //   .then(response => response.json())
  //   .catch(reason => logger(reason));
}

export function fetchComment(id) {
  logger(`Fetching ${HN_API_URL}/item/${id}.json`);
  return new Promise((resolve, reject) => {
    api.child(`item/${id}`).once('value', (itemSnapshot) => {
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
        cache.setComment(comment);
        logger(`Created Comment: ${item.id}`);
        resolve(comment);
      } else {
        reject(item);
      }
    }, reject);
  });
}

export function getFeed(feedType) {
  logger(`Fetching /${feedType}stories.json`);

  return new Promise((resolve, reject) => {
    api.child(`${feedType}stories`).once('value', (feedSnapshot) => {
      resolve(feedSnapshot.val());
    }, reject);
  });
}

const rebuildFeed = (feedType) => {
  setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);
  getFeed(feedType)
    .then(feed => Promise.all(feed.map(id => fetchNewsItem(id)))
      .then((newsItems) => {
        logger(newsItems);
        newsItems.forEach((newsItem, index) => newsItem.rank = index + 1);
        Feed[`${feedType}NewsItems`] = newsItems;
        Feed[feedType] = feed;
        logger(`Updated ${feedType} ids`);
      }),
    );
};

/* END NEWS ITEMS */

/* BEGIN SEED DATA */

export function seedCache(delay) {
  // TODO: Build sample cache then seed
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
