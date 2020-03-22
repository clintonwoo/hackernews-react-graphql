import { debug } from 'debug';

import { cache } from '../cache';
import * as HNDB from '../hn-data-api';
import * as DB from '../database';
import { NewsItemModel } from '../models';

const logger = debug('app:NewsItem');

let newPostIdCounter = 100;

export class NewsItemService {
  static getNewsItem(id: number) {
    return cache.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id);
  }

  static getNewsItems(ids: number[]) {
    return Promise.all(ids.map((id) => NewsItemService.getNewsItem(id)))
      .then((newsItems) => newsItems.filter((newsItem) => newsItem !== undefined))
      .catch((reason) => logger(`Rejected News Items: ${reason}`));
  }

  static upvoteNewsItem(id: number, userId: string) {
    return DB.upvoteNewsItem(id, userId);
  }

  static hideNewsItem(id: number, userId: string) {
    return DB.hideNewsItem(id, userId);
  }

  static submitNewsItem({ submitterId, title, text, url }) {
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
