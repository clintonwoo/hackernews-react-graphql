import { debug } from 'debug';
import * as Firebase from 'firebase';

import { HN_API_URL, HN_API_VERSION, HN_DB_URI } from '../config';
import { cache } from './cache';
import { Comment, FeedSingleton, NewsItem, User } from './models';

const logger = debug('app:HNDataAPI');
logger.log = console.log.bind(console);

if (!Firebase.apps.length) {
  Firebase.initializeApp({ databaseURL: HN_DB_URI });
}

const api = Firebase.database().ref(HN_API_VERSION);

// https://github.com/HackerNews/API

/* BEGIN NEWS ITEMS */

export function fetchNewsItem(id) {
  logger(`Fetching post ${HN_API_URL}/item/${id}.json`);

  return api
    .child(`item/${id}`)
    .once('value')
    .then(postSnapshot => {
      const post = postSnapshot.val();
      if (post !== null) {
        const newsItem = new NewsItem({
          id: post.id,
          creationTime: post.time * 1000,
          commentCount: post.descendants,
          comments: post.kids,
          submitterId: post.by,
          title: post.title,
          upvoteCount: post.score,
          url: post.url,
        });
        cache.setNewsItem(newsItem.id, newsItem);
        logger(`Created Post: ${post.id}`);
        return newsItem;
      }
      throw post;
    })
    .catch(reason => logger(`Fetching post failed: ${reason}`));
}

export function fetchComment(id) {
  logger(`Fetching comment ${HN_API_URL}/item/${id}.json`);

  return api
    .child(`item/${id}`)
    .once('value')
    .then(itemSnapshot => {
      const item = itemSnapshot.val();
      if (item !== null && !item.deleted && !item.dead) {
        const comment = new Comment({
          comments: item.kids,
          creationTime: item.time * 1000,
          id: item.id,
          parent: item.parent,
          submitterId: item.by,
          text: item.text,
        });

        cache.setComment(comment.id, comment);
        logger(`Created Comment: ${item.id}`);
        return comment;
      }
      throw item;
    })
    .catch(reason => logger(`Fetching comment failed: ${reason}`));
}

export function fetchUser(id) {
  logger(`Fetching user ${HN_API_URL}/user/${id}.json`);

  return api
    .child(`user/${id}`)
    .once('value')
    .then(itemSnapshot => {
      const item = itemSnapshot.val();
      if (item !== null && !item.deleted && !item.dead) {
        const user = new User({
          about: item.about,
          creationTime: item.created * 1000,
          id: item.id,
          karma: item.karma,
          posts: item.submitted,
        });

        cache.setUser(user.id, user);
        logger(`Created User: ${item.id}`, item);
        return user;
      }
      throw item;
    })
    .catch(reason => logger(`Fetching user failed: ${reason}`));
}

export function getFeed(feedType) {
  logger(`Fetching /${feedType}stories.json`);

  return api
    .child(`${feedType}stories`)
    .once('value')
    .then(feedSnapshot => feedSnapshot.val())
    .then(feed => feed.filter(newsItem => newsItem !== undefined && newsItem !== null))
    .catch(reason => logger(`Fetching news feed failed: ${reason}`));
}

const rebuildFeed = feedType => {
  setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);

  getFeed(feedType)
    .then(feed =>
      Promise.all(feed.map(id => fetchNewsItem(id))).then(newsItems => {
        logger(newsItems);

        FeedSingleton[`${feedType}NewsItems`] = newsItems.filter(
          newsItem => newsItem !== undefined && newsItem !== null
        );

        FeedSingleton[feedType] = feed;
        logger(`Updated ${feedType} ids`);
      })
    )
    .catch(reason => logger(`Error building feed: ${reason}`));
};

/* END NEWS ITEMS */

/* BEGIN SEED DATA */

export function seedCache(delay) {
  logger(`Waiting ${delay} ms before seeding the app with data.`);

  // Delay seeding the cache so we don't spam in dev
  setTimeout(() => {
    logger('Seeding cache');
    ['top', 'new', 'best', 'show', 'ask', 'job'].forEach(feedType => {
      rebuildFeed(feedType);
    });
  }, delay);
}

/*  END SEED DATA */
