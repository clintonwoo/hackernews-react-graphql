import { debug } from 'debug';

import { cache } from './cache';
import { FeedSingleton, User } from './models';
import { sampleData } from './sample-data';
import { NewsItem } from './models/news-item';

const logger = debug('app:Database');
logger.log = console.log.bind(console);

/*                  BEGIN NEWS ITEMS                      */

export function getNewsItem(id: number): NewsItem | undefined {
  return sampleData.newsItems.find((newsItem) => newsItem.id === id);
}

export function createNewsItem(newsItem: NewsItem): NewsItem {
  sampleData.newsItems.push(newsItem);

  return newsItem;
}

//                  NEWS ITEM MUTATIONS

export function upvoteNewsItem(id: number, userId: string): NewsItem | undefined {
  // Upvote the News Item in the DB
  const newsItem = cache.getNewsItem(id);

  if (newsItem && !newsItem.upvotes.includes(userId)) {
    newsItem.upvotes.push(userId);
    newsItem.upvoteCount += 1;
    cache.setNewsItem(id, newsItem);
  }

  return newsItem;
}

export function unvoteNewsItem(id: number, userId: string): NewsItem | undefined {
  const newsItem = cache.getNewsItem(id);

  if (newsItem && !newsItem.upvotes.includes(userId)) {
    newsItem.upvotes.splice(newsItem.upvotes.indexOf(userId), 1);
    newsItem.upvoteCount -= 1;
    cache.setNewsItem(id, newsItem);
  }

  return newsItem;
}

export function hideNewsItem(id: number, userId: string): NewsItem {
  logger(`Hiding News Item ${id} by ${userId}`);

  const newsItem = cache.getNewsItem(id);
  const user = cache.getUser(userId);

  if (user && !user.hides.includes(id) && newsItem && !newsItem.hides.includes(userId)) {
    user.hides.push(id);
    cache.setUser(userId, user);

    newsItem.hides.push(userId);
    cache.setNewsItem(id, newsItem);

    logger(`Hid News Item ${id} by ${userId}`);
  } else {
    throw new Error(`Data error, user has already hidden ${id} by ${userId}`);
  }

  return newsItem;
}

export function submitNewsItem(id: number, newsItem: NewsItem) {
  // Submit the News Item in the DB
  if (cache.setNewsItem(id, newsItem)) {
    FeedSingleton.new.unshift(id);
    FeedSingleton.new.pop();
    return newsItem;
  }

  throw new Error('Unable to submit News Item.');
}

/*                  END NEWS ITEMS                      */

/*                     BEGIN FEED                         */

export function getNewNewsItems(first: number, skip: number) {
  return sampleData.new.slice(skip, skip + first).map((postId, index) => ({
    ...getNewsItem(postId),
    rank: skip + index + 1,
  }));
}

export function getTopNewsItems(first: number, skip: number) {
  return sampleData.newsItems.slice(skip, skip + first);
}

export function getHotNews(): NewsItem[] {
  return sampleData.newsItems;
}

export function getNewsItems(): NewsItem[] {
  return sampleData.newsItems;
}

/*                     END FEED                         */

/*                   BEGIN USERS                        */

export function getUser(id: string) {
  return sampleData.users.find((user) => user.id === id);
}

export function getUsers() {
  return sampleData.users;
}

export function createUser(user: User) {
  sampleData.users.push(user);

  return user;
}

/*                    END USERS                         */
