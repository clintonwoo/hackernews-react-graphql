import { sampleData } from '../src/data/sample-data';
import { resolvers } from './graphql-resolvers';

describe('graphql-resolvers', () => {
  describe('Queries', () => {
    it('returns expected data for query on Feed', () => {
      expect(true);
    });

    it('returns expected data for query on Comment', () => {
      const result = (resolvers.Query as any).comment(
        undefined,
        { id: sampleData.topStoriesCache[0].comments[0].id },
        {
          CommentService: {
            getComment: (id) =>
              sampleData.topStoriesCache[0].comments.find((comment) => comment.id === id),
          },
        }
      );
      expect(result).toBeDefined();
    });

    it('returns expected data for query on Me', () => {
      expect(true);
    });

    it('returns expected data for News Item query', () => {
      expect(true);
    });

    it('returns expected data for User query', () => {
      expect(true);
    });
  });

  describe('Mutations', () => {
    it('returns data for upvoteNewsItem mutation', () => {
      expect(true);
    });

    it('returns data for submitNewsItem mutation', () => {
      expect(true);
    });
  });

  describe('Property Resolvers', () => {
    it('newsItem author is a user', () => {
      expect(true);
    });

    it('newsItem comments are comments', () => {
      expect(true);
    });
  });
});
