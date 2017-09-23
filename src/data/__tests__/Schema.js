import { resolvers } from '../Schema';

import data from '../../data/SampleData';

// const comment = data.topStoriesCache[0].comments[0];


describe('GraphQL', () => {
  describe('Resolvers', () => {
    describe('Queries', () => {
      it('returns expected data for query on Feed', () => {
        expect(true);
      });
      it('returns expected data for query on Comment', () => {
        const result = resolvers.Query.comment(
          undefined,
          { id: data.topStoriesCache[0].comments[0].id },
          {
            Comment: {
              getComment: id => data.topStoriesCache[0].comments.find(comment => comment.id === id),
            },
          },
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
});
