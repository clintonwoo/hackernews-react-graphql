// Interface: Commentable (Object can be commented on) comments, commentCount, commenter
// Interface: Voteable (Object can be voted on) upvotes, upvoteCount, hidden, hiddenCount,
// Data Type: Comment, can be on a news item or another comment
// Every time an upvote/downvote/comment is made, update the count

import LRU from 'lru-cache';
import debug from 'debug';

import {
  Feed,
} from './Models';

const logger = debug('app:Cache');
logger.log = console.log.bind(console);

// The cache is a singleton

export function warmCache() {
  // Fetch the front pages
  Feed.getForType('TOP', 30, 0);
  Feed.getForType('NEW', 30, 0);

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
  setNewsItem(id, newsItem) {
    return this.newsItemsCache.set(id, newsItem);
  }

  /*                  END NEWS ITEMS                      */

  /*                   BEGIN USERS                        */


  getUser(id) {
    return this.userCache.get(id);
  }

  getUsers() {
    return this.userCache.dump();
  }

  setUser(id, user) {
    logger(`Cache set user ${user}`);
    this.userCache.set(id, user);
    return user;
  }

  /*                    END USERS                         */

  /*                   BEGIN COMMENTS                        */


  getComment(id) {
    return this.commentCache.get(id);
  }

  setComment(id, comment) {
    this.userCache.set(comment.id, comment);
    logger(`Cache set comment ${comment}`);
    return comment;
  }

  /*                    END COMMENTS                         */

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
  commentCache = LRU({
    max: 5000,
    maxAge: 1000 * 60 * 60 * 1, // 1 hour cache: ms * s * m
  })

  /*                   END CACHES                         */
}

export default new Cache();
