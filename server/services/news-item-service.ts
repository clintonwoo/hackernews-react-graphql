import { debug } from 'debug';

import { CacheSingleton } from '../database/cache';
import * as HNDB from '../database/hn-data-api';
import * as DB from '../database/database';
import { NewsItemModel } from '../../src/data/models';

const logger = debug('app:NewsItem');

let newPostIdCounter = 100;

export class NewsItemService {
  static getNewsItem(id: number): NewsItemModel | Promise<NewsItemModel | void> {
    return CacheSingleton.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id);
  }

  static getNewsItems(ids: number[]): Promise<Array<NewsItemModel | void> | void> {
    return Promise.all(ids.map((id) => NewsItemService.getNewsItem(id)))
      .then((newsItems) => newsItems.filter((newsItem) => newsItem !== undefined))
      .catch((reason) => logger(`Rejected News Items: ${reason}`));
  }

  static upvoteNewsItem(id: number, userId: string): NewsItemModel | undefined {
    return DB.upvoteNewsItem(id, userId);
  }

  static hideNewsItem(id: number, userId: string): NewsItemModel {
    return DB.hideNewsItem(id, userId);
  }

  static submitNewsItem({ submitterId, title, text, url }): NewsItemModel {
    const newsItem = new NewsItemModel({
      id: newPostIdCounter += 1,
      submitterId,
      text,
      title,
      upvoteCount: 1,
      upvotes: [submitterId],
      url,
    });

    return DB.submitNewsItem(newsItem.id, newsItem);
  }
}
