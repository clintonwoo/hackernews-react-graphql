import { debug } from 'debug';

import { cache } from '../cache';
import * as HNDB from '../hn-data-api';
import { CommentModel } from '../models';

const logger = debug('app:Comment');

export class CommentService {
  static getComment(id: number): CommentModel | Promise<CommentModel | void> {
    return (
      cache.getComment(id) ||
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
