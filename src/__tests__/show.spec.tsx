/** @jest-environment jsdom */

import Page from '../../pages/show';

describe('Show Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
