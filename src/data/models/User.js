import data from '../SampleData';
import * as DB from '../Database';
import cache from '../Cache';

export default class User {
  static getUser(id) {
    return cache.getUser(id) || DB.getUser(id);
  }
  static getPostsForUser(id) {
    return DB.getNewsItems()
      .filter(newsItem => newsItem.submitterId === id);
  }
  static validPassword(data) {
    return false;
  }
}
