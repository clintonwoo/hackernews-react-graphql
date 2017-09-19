import debug from 'debug';

import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';

const logger = debug('app:NewsItem');

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
    const post = DB.getNewsItem(id);
    if (!post) {
      throw new Error(`Couldn't find post with id ${id}`);
    }
    post.upvoteCount += 1;
    return post;
  }
}
