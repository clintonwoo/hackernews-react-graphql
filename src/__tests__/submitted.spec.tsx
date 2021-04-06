/** @jest-environment jsdom */

import Page from '../../pages/submitted';

describe('Submitted Posts Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
