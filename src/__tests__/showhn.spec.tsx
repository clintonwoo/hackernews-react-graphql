/** @jest-environment jsdom */

import Page from '../../pages/showhn';

describe('Show HN Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
