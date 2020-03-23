import { debug } from 'debug';
import * as Firebase from 'firebase';

import { HN_API_URL, HN_API_VERSION, HN_DB_URI } from '../config';
import { cache } from './cache';
import { CommentModel, NewsItemModel, UserModel, FeedType } from '../../src/data/models';
// import { FeedSingleton } from './services';

const logger = debug('app:HNDataAPI');
logger.log = console.log.bind(console);

if (!Firebase.apps.length) {
  Firebase.initializeApp({ databaseURL: HN_DB_URI });
}

const api = Firebase.database().ref(HN_API_VERSION);

// https://github.com/HackerNews/API

/* BEGIN NEWS ITEMS */

export async function fetchNewsItem(id: number): Promise<NewsItemModel | void> {
  logger(`Fetching post ${HN_API_URL}/item/${id}.json`);

  return api
    .child(`item/${id}`)
    .once('value')
    .then((postSnapshot) => {
      const post = postSnapshot.val();

      if (post !== null) {
        const newsItem = new NewsItemModel({
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
    .catch((reason) => logger(`Fetching post failed: ${reason}`));
}

export async function fetchComment(id: number): Promise<CommentModel | void> {
  logger(`Fetching comment ${HN_API_URL}/item/${id}.json`);

  return api
    .child(`item/${id}`)
    .once('value')
    .then((itemSnapshot) => {
      const item = itemSnapshot.val();

      if (item !== null && !item.deleted && !item.dead) {
        const comment = new CommentModel({
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
    .catch((reason) => logger(`Fetching comment failed: ${reason}`));
}

export async function fetchUser(id: string): Promise<UserModel | void> {
  logger(`Fetching user ${HN_API_URL}/user/${id}.json`);

  return api
    .child(`user/${id}`)
    .once('value')
    .then((itemSnapshot) => {
      const item = itemSnapshot.val();

      if (item !== null && !item.deleted && !item.dead) {
        const user = new UserModel({
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
    .catch((reason) => logger(`Fetching user failed: ${reason}`));
}

export async function getFeed(feedType: FeedType): Promise<number[] | void> {
  logger(`Fetching /${feedType}stories.json`);

  return api
    .child(`${feedType}stories`)
    .once('value')
    .then((feedSnapshot) => feedSnapshot.val())
    .then((feed) => feed.filter((newsItem) => newsItem !== undefined && newsItem !== null))
    .catch((reason) => logger(`Fetching news feed failed: ${reason}`));
}

function rebuildFeed(feedType: FeedType): void {
  setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);

  getFeed(feedType)
    .then((feed) => {
      if (feed) {
        return Promise.all(feed.map((id: number) => fetchNewsItem(id))).then((newsItems) => {
          logger(newsItems);

          // FeedSingleton[`${feedType}NewsItems`] = newsItems.filter(
          //   (newsItem) => newsItem !== undefined && newsItem !== null
          // );

          // FeedSingleton[feedType] = feed;

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
