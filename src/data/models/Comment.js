import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';

export default class Comment {
  static getComment(id) {
    return cache.getComment(id) || HNDB.fetchComment(id);
  }
  static getCommentsForNewsItem(newsItemId) {
    // Check cache first?
    return DB.getNewsItem(newsItemId);
  }
}
