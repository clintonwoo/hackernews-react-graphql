import { debug } from 'debug';

import { CacheSingleton } from '../database/cache';
import * as HNDB from '../database/hn-data-api';
import { CommentModel } from '../../src/data/models';

const logger = debug('app:Comment');

export class CommentService {
  static getComment(id: number): CommentModel | Promise<CommentModel | void> {
    return (
      CacheSingleton.getComment(id) ||
      HNDB.fetchComment(id).catch((reason) => logger(`Rejected comment: ${reason}`))
    );
  }

  static getComments(ids: number[]): Promise<Array<CommentModel> | void> {
    return Promise.all(ids.map((commentId) => CommentService.getComment(commentId)))
      .then((comments): CommentModel[] =>
        comments.filter((comment): comment is CommentModel => comment !== undefined)
      )
      .catch((reason) => logger(`Rejected comments: ${reason}`));
  }
}
