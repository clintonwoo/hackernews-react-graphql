import { CommentService } from './comment-service';

describe('NewsItem Model', () => {
  it('gets a single comment', () => {
    const id = 100;
    const comment = CommentService.getComment(id);

    expect(comment).toBeDefined();
  });

  it('gets an array of comments', () => {
    const ids = [1, 3, 100];
    const comments = CommentService.getComments(ids);

    expect(comments).toBeDefined();
  });
});
