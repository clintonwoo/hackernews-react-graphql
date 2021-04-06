/** @jest-environment jsdom */

import Page from '../../pages/security';

describe('Security Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
