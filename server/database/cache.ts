import { debug } from 'debug';
import LRU from 'lru-cache';

import { NewsItemModel, UserModel, CommentModel } from '../../src/data/models';

const logger = debug('app:Cache');
logger.log = console.log.bind(console);

// The cache is a singleton

class Cache {
  isReady = false;

  /*                  BEGIN NEWS ITEMS                      */

  getNewsItem(id: number): NewsItemModel | undefined {
    return this.newsItemsCache.get(id.toString());
  }

  setNewsItem(id: number, newsItem: NewsItemModel): boolean {
    return this.newsItemsCache.set(id.toString(), newsItem);
  }

  /*                  END NEWS ITEMS                      */

  /*                   BEGIN USERS                        */

  getUser(id: string): UserModel | undefined {
    return this.userCache.get(id);
  }

  getUsers(): Array<LRU.Entry<string, UserModel>> {
    return this.userCache.dump();
  }

  setUser(id: string, user: UserModel): UserModel {
    logger(`Cache set user ${user}`);

    this.userCache.set(id, user);

    return user;
  }

  /*                    END USERS                         */

  /*                   BEGIN COMMENTS                        */

  getComment(id: number): CommentModel | undefined {
    return this.commentCache.get(id.toString());
  }

  setComment(id: number, comment: CommentModel): CommentModel {
    this.commentCache.set(comment.id.toString(), comment);

    logger(`Cache set comment ${comment}`);

    return comment;
  }

  /*                    END COMMENTS                         */

  /*                   BEGIN CACHES                         */

  newNewsItemsCache = new LRU<string, NewsItemModel>({
    max: 500,
    maxAge: 1000 * 60 * 60, // 60 Minute cache: ms * s * m
  });

  newsItemsCache = new LRU<string, NewsItemModel>({
    max: 1000,
    maxAge: 1000 * 60 * 60, // 60 Minute cache: ms * s * m
  });

  userCache = new LRU<string, UserModel>({
    max: 500,
    maxAge: 1000 * 60 * 60 * 2, // 2 hour cache: ms * s * m
  });

  commentCache = new LRU<string, CommentModel>({
    max: 5000,
    maxAge: 1000 * 60 * 60 * 1, // 1 hour cache: ms * s * m
  });

  /*                   END CACHES                         */
}

export const cache = new Cache();
