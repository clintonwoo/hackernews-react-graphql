import { debug } from 'debug';

import { cache } from '../cache';
import * as HNDB from '../hn-data-api';

const logger = debug('app:Comment');

export class Comment {
  public readonly id;
  public readonly creationTime;
  public readonly comments;
  public readonly parent;
  public readonly submitterId;
  public readonly text;

  constructor(props) {
    if (!props.id) throw new Error(`Error instantiating Comment, id invalid: ${props.id}`);
    if (!props.parent) throw new Error(`Error instantiating Comment, parent invalid: ${props.parent}`);
    if (!props.submitterId) throw new Error(`Error instantiating Comment, submitterId invalid: ${props.submitterId}`);
    if (!props.text) throw new Error(`Error instantiating Comment, text invalid: ${props.text}`);

    this.id = props.id;
    this.creationTime = props.creationTime || +new Date();
    this.comments = props.comments || [];
    this.parent = props.parent;
    this.submitterId = props.submitterId;
    this.text = props.text;
  }
  static getComment = id =>
    cache.getComment(id) || HNDB.fetchComment(id).catch(reason => logger(`Rejected comment: ${reason}`));

  static getComments = ids =>
    Promise.all(ids.map(commentId => Comment.getComment(commentId)))
      .then(comments => comments.filter(comment => comment !== undefined))
      .catch(reason => logger(`Rejected comments: ${reason}`));
}
