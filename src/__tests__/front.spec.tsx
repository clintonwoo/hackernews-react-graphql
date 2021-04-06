/** @jest-environment jsdom */

import Page from '../../pages/front';

describe('Front Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
