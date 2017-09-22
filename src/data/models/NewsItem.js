import debug from 'debug';

import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';

const logger = debug('app:NewsItem');
let newPostIdCounter = 100;

export default class NewsItem {
  static getNewsItem(id) {
    return cache.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id);
  }
  static getNewsItems(ids) {
    return Promise.all(ids.map(id => NewsItem.getNewsItem(id)))
      .then(newsItems => newsItems.filter(newsItem => newsItem !== undefined))
      .catch(reason => logger(`Rejected News Items: ${reason}`));
  }
  
  static upvoteNewsItem(id) {
    return DB.upvoteNewsItem(id);
  }

  static submitNewsItem({ submitterId, text, url }) {
    const newsItem = {
      id: newPostIdCounter += 1,
      comments: [],
      commentCount: 0,
      creationTime: new Date().valueOf(),
      hidden: [],
      hiddenCount: 0,
      points: 1,
      submitterId,
      text: text || null,
      url: url || null,
      upvotes: [submitterId],
      upvoteCount: 1,
    };
    return DB.submitNewsItem(newsItem.id, newsItem);
  }
}
