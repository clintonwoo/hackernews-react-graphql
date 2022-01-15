import { debug } from 'debug';
import { child, get, DatabaseReference } from 'firebase/database';

import type { HnCache } from './cache';
import { CommentModel, FeedType, NewsItemModel, UserModel } from '../../src/data/models';
import { sampleData } from '../../src/data/sample-data';
import { HN_API_URL } from '../../src/config';

const logger = debug('app:Database');
logger.log = console.log.bind(console);

// https://github.com/HackerNews/API

export class HnDatabase {
  db: DatabaseReference;
  cache: HnCache;

  constructor(db: DatabaseReference, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async fetchNewsItem(id: number): Promise<NewsItemModel | void> {
    logger('Fetching post:', `${HN_API_URL}/item/${id}.json`);

    return get(child(this.db, `item/${id}`))
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

          this.cache.setNewsItem(newsItem.id, newsItem);
          logger('Created Post:', post.id);

          return newsItem;
        }

        throw post;
      })
      .catch((reason) => logger('Fetching post failed:', reason));
  }

  async fetchComment(id: number): Promise<CommentModel | void> {
    logger('Fetching comment:', `${HN_API_URL}/item/${id}.json`);

    return get(child(this.db, `item/${id}`))
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

          this.cache.setComment(comment.id, comment);
          logger('Created Comment:', item.id);

          return comment;
        }

        throw item;
      })
      .catch((reason) => logger('Fetching comment failed:', reason));
  }

  async fetchUser(id: string): Promise<UserModel | void> {
    logger('Fetching user:', `${HN_API_URL}/user/${id}.json`);

    return get(child(this.db, `user/${id}`))
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

          this.cache.setUser(user.id, user);
          logger('Created User:', item.id, item);

          return user;
        }

        throw item;
      })
      .catch((reason) => logger('Fetching user failed:', reason));
  }

  async getFeed(feedType: FeedType): Promise<number[] | void> {
    logger('Fetching', `/${feedType}stories.json`);

    return get(child(this.db, `${feedType}stories`))
      .then((feedSnapshot) => feedSnapshot.val())
      .then((feed) => feed.filter((newsItem) => newsItem !== undefined && newsItem !== null))
      .catch((reason) => logger('Fetching news feed failed:', reason));
  }

  /*                  BEGIN NEWS ITEMS                      */

  getNewsItem(id: number): NewsItemModel | undefined {
    return sampleData.newsItems.find((newsItem) => newsItem.id === id);
  }

  createNewsItem(newsItem: NewsItemModel): NewsItemModel {
    sampleData.newsItems.push(newsItem);

    return newsItem;
  }

  //                  NEWS ITEM MUTATIONS

  upvoteNewsItem(id: number, userId: string): NewsItemModel | undefined {
    // Upvote the News Item in the DB
    const newsItem = this.cache.getNewsItem(id);

    if (newsItem && !newsItem.upvotes.includes(userId)) {
      newsItem.upvotes.push(userId);
      newsItem.upvoteCount += 1;
      this.cache.setNewsItem(id, newsItem);
    }

    return newsItem;
  }

  unvoteNewsItem(id: number, userId: string): NewsItemModel | undefined {
    const newsItem = this.cache.getNewsItem(id);

    if (newsItem && !newsItem.upvotes.includes(userId)) {
      newsItem.upvotes.splice(newsItem.upvotes.indexOf(userId), 1);
      newsItem.upvoteCount -= 1;
      this.cache.setNewsItem(id, newsItem);
    }

    return newsItem;
  }

  hideNewsItem(id: number, userId: string): NewsItemModel {
    logger('Hiding News Item id by userId:', id, userId);

    const newsItem = this.cache.getNewsItem(id);
    const user = this.cache.getUser(userId);

    if (user && !user.hides.includes(id) && newsItem && !newsItem.hides.includes(userId)) {
      user.hides.push(id);
      this.cache.setUser(userId, user);

      newsItem.hides.push(userId);
      this.cache.setNewsItem(id, newsItem);

      logger('Hid News Item id by userId:', id, userId);
    } else {
      throw new Error(`Data error, user has already hidden ${id} by ${userId}`);
    }

    return newsItem;
  }

  submitNewsItem(id: number, newsItem: NewsItemModel): NewsItemModel {
    // Submit the News Item in the DB
    if (this.cache.setNewsItem(id, newsItem)) {
      // FeedSingleton.new.unshift(id);
      // FeedSingleton.new.pop();
      return newsItem;
    }

    throw new Error('Unable to submit News Item.');
  }

  /*                  END NEWS ITEMS                      */

  /*                     BEGIN FEED                         */

  getNewNewsItems(first: number, skip: number): NewsItemModel[] {
    return sampleData.newsItems.slice(skip, skip + first);
  }

  getTopNewsItems(first: number, skip: number): NewsItemModel[] {
    return sampleData.newsItems.slice(skip, skip + first);
  }

  getHotNews(): NewsItemModel[] {
    return sampleData.newsItems;
  }

  getNewsItems(): NewsItemModel[] {
    return sampleData.newsItems;
  }

  /*                     END FEED                         */

  /*                   BEGIN USERS                        */

  getUser(id: string): UserModel | undefined {
    return sampleData.users.find((user) => user.id === id);
  }

  getUsers(): UserModel[] {
    return sampleData.users;
  }

  createUser(user: UserModel): UserModel {
    sampleData.users.push(user);

    return user;
  }

  /*                    END USERS                         */
}
