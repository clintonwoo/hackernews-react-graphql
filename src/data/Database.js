import debug from 'debug';

import {
  Feed,
} from './Models';
import data from './SampleData';
import cache from './Cache';

const logger = debug('app:Database');
logger.log = console.log.bind(console);

/*                  BEGIN NEWS ITEMS                      */


export function getNewsItem(id) {
  return data.newsItems.find(newsItem => newsItem.id === id);
}

export function rankNewsItems() {
  // Would implement this somewhere in the real HN system
  // A scheduled job to recalculate feed ranks
  // .sort((a, b) => (a.rank - b.rank))
}

export function createNewsItem(newsItem) {
  data.newsItems.push(newsItem);
  return newsItem;
}

//                  NEWS ITEM MUTATIONS


export function upvoteNewsItem(id, userId) {
  // Upvote the News Item in the DB
  const newsItem = cache.getNewsItem(id);
  if (newsItem && !newsItem.upvotes.includes(userId)) {
    newsItem.upvotes.push(userId);
    newsItem.upvoteCount += 1;
    cache.setNewsItem(id, newsItem);
  }
  return newsItem;
}

export function unvoteNewsItem(id, userId) {
  const newsItem = cache.getNewsItem(id);
  if (newsItem && !newsItem.upvotes.includes(userId)) {
    newsItem.upvotes.splice(newsItem.upvotes.indexOf(userId), 1);
    newsItem.upvoteCount -= 1;
    cache.setNewsItem(id, newsItem);
  }
  return newsItem;
}

export function downvoteNewsItem(id, userId) {
  const newsItemData = data.newsItems.find(newsItem => newsItem.id === id);
  newsItemData.downvotes.push(userId);
  newsItemData.downvoteCount += 1;

  return newsItemData;
}

export function hideNewsItem(id, userId) {
  logger(`Hiding News Item ${id} by ${userId}`);

  const newsItem = cache.getNewsItem(id);
  const user = cache.getUser(userId);

  if (user && !user.hides.includes(id) && newsItem && !newsItem.hides.includes(userId)) {
    user.hides.push(id);
    cache.setUser(id, user);

    newsItem.hides.push(userId);
    newsItem.hiddenCount += 1;
    cache.setNewsItem(id, newsItem);

    logger(`Hid News Item ${id} by ${userId}`);
  } else throw new Error(`Data error, user has already hidden ${id} by ${userId}`);

  return newsItem;
}

export function submitNewsItem(id, newsItem) {
  // Submit the News Item in the DB
  if (cache.setNewsItem(id, newsItem)) {
    Feed.new.unshift(id);
    Feed.new.pop();
    return newsItem;
  }
  throw new Error('Unable to submit News Item.');
}

/*                  END NEWS ITEMS                      */

/*                     BEGIN FEED                         */


export function getNewNewsItems(first, skip) {
  return data.new.slice(skip, skip + first)
    .map((postId, index) => ({
      ...getNewsItem(postId),
      rank: skip + index + 1,
    }));
}

export function getTopNewsItems(first, skip) {
  return data.newsItems.slice(skip, skip + first);
}

export function getHotNews() {
  return data.newsItems;
}

export function getNewsItems() {
  return data.newsItems;
}

/*                     END FEED                         */

/*                   BEGIN USERS                        */


export function getUser(id) {
  return data.users.find(user => user.id === id);
}

export function getUsers() {
  return data.users;
}

export function createUser(user) {
  data.users.push(user);
  return user;
}

/*                    END USERS                         */
