/** @jest-environment jsdom */

import Page from '../../pages/newcomments';

describe('New Comments Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
