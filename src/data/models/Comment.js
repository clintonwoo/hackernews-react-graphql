import debug from 'debug';

import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';

const logger = debug('app:Comment');

export default class Comment {
  static getComment(id) {
    return cache.getComment(id) || HNDB.fetchComment(id).catch(reason => logger(`Rejected comment: ${reason}`));
  }
  static getComments(ids) {
    return Promise.all(ids.map(commentId => Comment.getComment(commentId)))
      .then(comments => comments.filter(comment => comment !== undefined));
    // return Promise.all(ids.map(comment => cache.getComment(comment.id) || HNDB.fetchComment(comment.id)));
    // return ids.map(comment => cache.getComment(comment.id) || HNDB.fetchComment(comment.id));
  }

  static getCommentsForNewsItem(newsItemId) {
    // Check cache first?
    return DB.getNewsItem(newsItemId);
  }
}
