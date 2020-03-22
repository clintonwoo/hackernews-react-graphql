export class CommentModel {
  public readonly id: number;

  public readonly creationTime: number;

  public readonly comments: number[];

  public readonly parent: number;

  public readonly submitterId: string;

  public readonly upvotes: string[];

  public readonly text: string;

  constructor(fields) {
    if (!fields.id) {
      throw new Error(`Error instantiating Comment, id invalid: ${fields.id}`);
    } else if (!fields.parent) {
      throw new Error(`Error instantiating Comment, parent invalid: ${fields.parent}`);
    } else if (!fields.submitterId) {
      throw new Error(`Error instantiating Comment, submitterId invalid: ${fields.submitterId}`);
    } else if (!fields.text) {
      throw new Error(`Error instantiating Comment, text invalid: ${fields.text}`);
    }

    this.id = fields.id;
    this.creationTime = fields.creationTime || +new Date();
    this.comments = fields.comments || [];
    this.parent = fields.parent;
    this.submitterId = fields.submitterId;
    this.text = fields.text;
    this.upvotes = fields.upvotes || [];
  }
}
