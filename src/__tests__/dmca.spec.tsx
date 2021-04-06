/** @jest-environment jsdom */

import Page from '../../pages/dmca';

describe('DMCA Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
