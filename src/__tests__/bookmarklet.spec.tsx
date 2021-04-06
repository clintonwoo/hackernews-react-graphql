/** @jest-environment jsdom */

import Page from '../../pages/bookmarklet';

describe('Bookmarklet Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
