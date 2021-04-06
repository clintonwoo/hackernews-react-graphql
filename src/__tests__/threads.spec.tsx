/** @jest-environment jsdom */

import Page from '../../pages/threads';

describe('Threads Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
