import data from '../SampleData';
import * as DB from '../Database';

export default class Comment {
  static getCommentsForNewsItem(newsItemId) {
    // Check cache first?
    return DB.getNewsItem(newsItemId);
  }
}
