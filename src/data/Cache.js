// Interface: Commentable (Object can be commented on) comments, commentCount, commenter
// Interface: Voteable (Object can be voted on) upvotes, upvoteCount, hidden, hiddenCount,
// Data Type: Comment, can be on a news item or another comment
// Every time an upvote/downvote/comment is made, update the count

import LRU from 'lru-cache';

import {
  Feed,
} from './models';

// The cache is a singleton

export function warmCache() {
  // Fetch the front pages
  Feed.getForType('HOT', 30, 0);
  Feed.getForType('NEW', 30, 0);
  Feed.getForType('TOP', 30, 0);

  // Run every 15 mins
  setTimeout(warmCache, 1000 * 60 * 15);
}

class Cache {
  isReady = false;

  /*                  BEGIN NEWS ITEMS                      */


  getNewsItem(id) {
    // return this.newsItems.find(newsItem => newsItem.id === id);
    return this.newsItemsCache.get(id);
  }
  setNewsItem(newsItem) {
    return this.newsItemsCache.set(newsItem.id, newsItem);
  }

  /*                  END NEWS ITEMS                      */

  /*                   BEGIN USERS                        */


  getUser(id) {
    return this.userCache.get(id);
  }

  getUsers() {
    return this.userCache.dump();
  }

  createUser(user) {
    this.userCache.set(user.id, user);
    return user;
  }

  /*                    END USERS                         */

  /*                   BEGIN CACHES                         */


  newNewsItemsCache = LRU({
    max: 500,
    maxAge: 1000 * 60 * 60, // 60 Minute cache: ms * s * m
  })
  newsItemsCache = LRU({
    max: 1000,
    maxAge: 1000 * 60 * 60, // 60 Minute cache: ms * s * m
  })
  userCache = LRU({
    max: 500,
    maxAge: 1000 * 60 * 60 * 2, // 2 hour cache: ms * s * m
  })

  /*                   END CACHES                         */
}

export default new Cache();
