import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';


export default class NewsItem {
  static getNewsItem(id) {
    // Check cache first?
    return cache.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id);
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
