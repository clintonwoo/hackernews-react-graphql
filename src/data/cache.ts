import { debug } from 'debug';
import LRU from 'lru-cache';

import { FeedSingleton, NewsItem } from './models';
import { FeedType } from './models/feed';
import { User } from './models/user';
import { Comment } from './models/comment';

const logger = debug('app:Cache');
logger.log = console.log.bind(console);

// The cache is a singleton

export function warmCache(): void {
  // Fetch the front pages
  FeedSingleton.getForType(FeedType.TOP, 30, 0);
  FeedSingleton.getForType(FeedType.NEW, 30, 0);

  // Run every 15 mins
  setTimeout(warmCache, 1000 * 60 * 15);
}

class Cache {
  isReady = false;

  /*                  BEGIN NEWS ITEMS                      */

  getNewsItem(id: number): NewsItem | undefined {
    return this.newsItemsCache.get(id.toString());
  }

  setNewsItem(id: number, newsItem: NewsItem): boolean {
    return this.newsItemsCache.set(id.toString(), newsItem);
  }

  /*                  END NEWS ITEMS                      */

  /*                   BEGIN USERS                        */

  getUser(id): User | undefined {
    return this.userCache.get(id);
  }

  getUsers(): Array<LRU.Entry<string, User>> {
    return this.userCache.dump();
  }

  setUser(id: string, user: User): User {
    logger(`Cache set user ${user}`);
    this.userCache.set(id, user);
    return user;
  }

  /*                    END USERS                         */

  /*                   BEGIN COMMENTS                        */

  getComment(id: number): Comment | undefined {
    return this.commentCache.get(id.toString());
  }

  setComment(id: number, comment: Comment): Comment {
    this.commentCache.set(comment.id.toString(), comment);
    logger(`Cache set comment ${comment}`);
    return comment;
  }

  /*                    END COMMENTS                         */

  /*                   BEGIN CACHES                         */

  newNewsItemsCache = new LRU<string, NewsItem>({
    max: 500,
    maxAge: 1000 * 60 * 60, // 60 Minute cache: ms * s * m
  });

  newsItemsCache = new LRU<string, NewsItem>({
    max: 1000,
    maxAge: 1000 * 60 * 60, // 60 Minute cache: ms * s * m
  });

  userCache = new LRU<string, User>({
    max: 500,
    maxAge: 1000 * 60 * 60 * 2, // 2 hour cache: ms * s * m
  });

  commentCache = new LRU<string, Comment>({
    max: 5000,
    maxAge: 1000 * 60 * 60 * 1, // 1 hour cache: ms * s * m
  });

  /*                   END CACHES                         */
}

export const cache = new Cache();
