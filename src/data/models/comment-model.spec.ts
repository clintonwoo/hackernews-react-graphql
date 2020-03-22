import { CommentModel } from './comment-model';

describe('NewsItem Model', () => {
  it('gets a single comment', () => {
    const id = 100;
    const comment = CommentModel.getComment(id);

    expect(comment);
  });

  it('gets an array of comments', () => {
    const ids = [1, 3, 100];
    const comments = CommentModel.getComments(ids);

    expect(comments);
  });
});
