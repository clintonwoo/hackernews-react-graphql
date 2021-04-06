/** @jest-environment jsdom */

import Page from '../../pages/hidden';

describe('Hidden Posts Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
