/** @jest-environment jsdom */

import Page from '../../pages/jobs';

describe('Jobs Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
