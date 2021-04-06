/** @jest-environment jsdom */

import Page from '../../pages/best';

describe('Best Posts Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
