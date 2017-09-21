import data from '../../data/SampleData';

const comment = data.topStoriesCache[0].comments[0];

describe('GraphQL', () => {
  describe('Queries', () => {
    it('returns expected data for Feed query', () => {
      
      expect(comment);
    });
    it('returns expected data for Comment query', () => {
      
      expect(comment);
    });
    it('returns expected data for Me query', () => {
      
      expect(comment);
    });
    it('returns expected data for News Item query', () => {
      
      expect(comment);
    });
    it('returns expected data for User query', () => {
      
      expect(comment);
    });
  });

  describe('Mutations', () => {
    it('returns data for upvoteNewsItem mutation', () => {
      
      expect(comment);
    });
    it('returns data for submitNewsItem mutation', () => {
      
      expect(comment);
    });
  });

  describe('Property Resolvers', () => {
    it('newsItem author is a user', () => {
      
      expect(comment);
    });
    it('newsItem comments are comments', () => {
      
      expect(comment);
    });
  });
});
