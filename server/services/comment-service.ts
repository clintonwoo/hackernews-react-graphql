import { debug } from 'debug';

import type { CommentModel } from '../../src/data/models';
import type { HnCache } from '../database/cache';
import type { HnDatabase } from '../database/database';

const logger = debug('app:Comment');
logger.log = console.log.bind(console);

export class CommentService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getComment(id: number): Promise<CommentModel | void> {
    return (
      this.cache.getComment(id) ||
      this.db.fetchComment(id).catch((reason) => logger('Rejected comment:', reason))
    );
  }

  async getComments(ids: number[]): Promise<Array<CommentModel> | void> {
    return Promise.all(ids.map((commentId) => this.getComment(commentId)))
      .then((comments): CommentModel[] =>
        comments.filter((comment): comment is CommentModel => comment !== undefined)
      )
      .catch((reason) => logger('Rejected comments:', reason));
  }
}
