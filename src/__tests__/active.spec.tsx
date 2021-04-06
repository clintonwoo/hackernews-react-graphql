/** @jest-environment jsdom */

import Page from '../../pages/active';

describe('Active Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
