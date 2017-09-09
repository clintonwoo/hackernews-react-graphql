import data from '../SampleData';
import * as DB from '../Database';
import cache from '../Cache';

export default class Feed {
  static getUser(id) {
    return cache.getUser(id) || DB.getUser(id);
  }
  static getPostsForUser(id) {
    return DB.getNewsItems()
      .filter(newsItem => newsItem.submitterId === id);
  }
}
