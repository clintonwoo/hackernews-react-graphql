import { debug } from 'debug';

import { NewsItemModel } from '../../src/data/models';
import { HnCache } from '../database/cache';
import { HnDatabase } from '../database/database';

const logger = debug('app:NewsItem');
logger.log = console.log.bind(console);

let newPostIdCounter = 100;

export class NewsItemService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getNewsItem(id: number): Promise<NewsItemModel | void> {
    return this.cache.getNewsItem(id) || this.db.getNewsItem(id) || this.db.fetchNewsItem(id);
  }

  async getNewsItems(ids: number[]): Promise<Array<NewsItemModel | void> | void> {
    return Promise.all(ids.map((id) => this.getNewsItem(id)))
      .then((newsItems) => newsItems.filter((newsItem) => newsItem !== undefined))
      .catch((reason) => logger('Rejected News Items:', reason));
  }

  async upvoteNewsItem(id: number, userId: string): Promise<NewsItemModel | undefined> {
    return this.db.upvoteNewsItem(id, userId);
  }

  async hideNewsItem(id: number, userId: string): Promise<NewsItemModel> {
    return this.db.hideNewsItem(id, userId);
  }

  async submitNewsItem({ submitterId, title, text, url }): Promise<NewsItemModel> {
    const newsItem = new NewsItemModel({
      id: (newPostIdCounter += 1),
      submitterId,
      text,
      title,
      upvoteCount: 1,
      upvotes: [submitterId],
      url,
    });

    return this.db.submitNewsItem(newsItem.id, newsItem);
  }
}
