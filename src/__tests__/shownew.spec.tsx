/** @jest-environment jsdom */

import Page from '../../pages/shownew';

describe('Show New Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
