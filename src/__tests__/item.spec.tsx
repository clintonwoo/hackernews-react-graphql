/** @jest-environment jsdom */

import Page from '../../pages/item';

describe('News Item Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
