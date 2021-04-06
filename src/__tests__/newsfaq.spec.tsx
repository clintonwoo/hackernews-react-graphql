/** @jest-environment jsdom */

import Page from '../../pages/newsfaq';

describe('FAQ Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
