import Comment from '../Comment';

describe('NewsItem Model', () => {
  it('gets a single comment', () => {
    const id = 100;
    const comment = Comment.getComment(id);
    expect(comment);
  });
  it('gets an array of comments', () => {
    const ids = [1, 3, 100];
    const comments = Comment.getComments(ids);
    expect(comments);
  });
});

