/** @jest-environment jsdom */

import Page from '../../pages/lists';

describe('Lists Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
