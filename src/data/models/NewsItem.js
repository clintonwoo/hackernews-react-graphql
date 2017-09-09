import data from '../SampleData';
import * as DB from '../Database';
import cache from '../Cache';

export default class NewsItem {
  static getNewsItem(id) {
    // Check cache first?
    return cache.getNewsItem(id) || DB.getNewsItem(id);
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
