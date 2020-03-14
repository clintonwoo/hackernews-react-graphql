import { debug } from 'debug';

import { cache } from '../cache';
import * as HNDB from '../hn-data-api';

const logger = debug('app:Comment');

export class Comment {
  public readonly id: number;
  public readonly creationTime: number;
  public readonly comments: number[];
  public readonly parent: number;
  public readonly submitterId: string;
  public readonly upvotes: string[];
  public readonly text: string;

  constructor(fields) {
    if (!fields.id) throw new Error(`Error instantiating Comment, id invalid: ${fields.id}`);
    if (!fields.parent) throw new Error(`Error instantiating Comment, parent invalid: ${fields.parent}`);
    if (!fields.submitterId) throw new Error(`Error instantiating Comment, submitterId invalid: ${fields.submitterId}`);
    if (!fields.text) throw new Error(`Error instantiating Comment, text invalid: ${fields.text}`);

    this.id = fields.id;
    this.creationTime = fields.creationTime || +new Date();
    this.comments = fields.comments || [];
    this.parent = fields.parent;
    this.submitterId = fields.submitterId;
    this.text = fields.text;
    this.upvotes = fields.upvotes || [];
  }
  static getComment = id =>
    cache.getComment(id) || HNDB.fetchComment(id).catch(reason => logger(`Rejected comment: ${reason}`));

  static getComments = ids =>
    Promise.all(ids.map(commentId => Comment.getComment(commentId)))
      .then(comments => comments.filter(comment => comment !== undefined))
      .catch(reason => logger(`Rejected comments: ${reason}`));
}
