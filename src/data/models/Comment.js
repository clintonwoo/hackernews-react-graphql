import debug from 'debug';

import cache from '../Cache';
import * as HNDB from '../HNDataAPI';

const logger = debug('app:Comment');

export default class Comment {
  static getComment(id) {
    return cache.getComment(id) || HNDB.fetchComment(id).catch(reason => logger(`Rejected comment: ${reason}`));
  }
  static getComments(ids) {
    return Promise.all(ids.map(commentId => Comment.getComment(commentId)))
      .then(comments => comments.filter(comment => comment !== undefined))
      .catch(reason => logger(`Rejected comments: ${reason}`));
  }
}
