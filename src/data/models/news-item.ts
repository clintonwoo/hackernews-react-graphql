import { debug } from 'debug';

import { cache } from '../cache';
import * as HNDB from '../hn-data-api';
import * as DB from '../database';
import { isValidUrl } from '../../helpers/is-valid-url';

const logger = debug('app:NewsItem');

let newPostIdCounter = 100;

export class NewsItem {
  /** ID of submitter */
  public readonly id: number;

  /** Count of comments on the post */
  public readonly commentCount: number;

  /** List of comments */
  public readonly comments;

  /** Post creation time, number of ms since 1970 */
  public readonly creationTime: number;

  /** IDs of users who hid the post */
  public readonly hides: string[];

  public readonly hiddenCount: number;

  /** ID of user who submitted */
  public readonly submitterId: string;

  /** Body text */
  public readonly text: string | null;

  /** Post title */
  public readonly title: string;

  /** Number of upvotes */
  public upvoteCount: number;

  public readonly upvotes;

  public readonly url?: string;

  public readonly hidden?: boolean; // TODO: exists?

  constructor(fields) {
    if (!fields.id) {
      throw new Error(`Error instantiating News Item, id is required: ${fields.id}`);
    }
    if (!fields.submitterId) {
      throw new Error(`Error instantiating News Item, submitterId is required: ${fields.id}`);
    }
    if (!fields.title) {
      throw new Error(`Error instantiating News Item, title is required: ${fields.id}`);
    }
    if (fields.url && !isValidUrl(fields.url)) {
      throw new Error(`Error instantiating News Item ${fields.id}, invalid URL: ${fields.url}`);
    }

    this.id = fields.id || (newPostIdCounter += 1);
    this.commentCount = fields.commentCount || 0;
    this.comments = fields.comments || [];
    this.creationTime = fields.creationTime || +new Date();
    this.hides = fields.hides || [];
    this.hiddenCount = this.hides.length;
    this.submitterId = fields.submitterId;
    this.text = fields.text || null;
    this.title = fields.title;
    this.upvoteCount = fields.upvoteCount || 1;
    this.upvotes = fields.upvotes || [fields.submitterId];
    this.url = fields.url;
  }

  static getNewsItem = id => cache.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id);

  static getNewsItems = ids =>
    Promise.all(ids.map(id => NewsItem.getNewsItem(id)))
      .then(newsItems => newsItems.filter(newsItem => newsItem !== undefined))
      .catch(reason => logger(`Rejected News Items: ${reason}`));

  static upvoteNewsItem = (id, userId) => DB.upvoteNewsItem(id, userId);

  static hideNewsItem = (id, userId) => DB.hideNewsItem(id, userId);

  static submitNewsItem = ({ submitterId, title, text, url }) => {
    const newsItem = new NewsItem({
      id: newPostIdCounter += 1,
      submitterId,
      text,
      title,
      upvoteCount: 1,
      upvotes: [submitterId],
      url,
    });

    return DB.submitNewsItem(newsItem.id, newsItem);
  };
}
