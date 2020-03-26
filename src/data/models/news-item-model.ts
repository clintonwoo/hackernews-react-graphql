import { isValidUrl } from '../../helpers/is-valid-url';

let newPostIdCounter = 100;

export class NewsItemModel {
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

  public readonly rank?: number;

  constructor(fields) {
    if (!fields.id) {
      throw new Error(`Error instantiating News Item, id is required: ${fields.id}`);
    } else if (!fields.submitterId) {
      throw new Error(`Error instantiating News Item, submitterId is required: ${fields.id}`);
    } else if (!fields.title) {
      throw new Error(`Error instantiating News Item, title is required: ${fields.id}`);
    } else if (fields.url && !isValidUrl(fields.url)) {
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
}
