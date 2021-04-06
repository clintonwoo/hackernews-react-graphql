/** @jest-environment jsdom */

import Page from '../../pages/bestcomments';

describe('Best Comments Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
