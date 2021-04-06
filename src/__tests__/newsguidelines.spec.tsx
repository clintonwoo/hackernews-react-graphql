/** @jest-environment jsdom */

import Page from '../../pages/newsguidelines';

describe('Guidelines Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
