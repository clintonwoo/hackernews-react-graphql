/** @jest-environment jsdom */

import Page from '../../pages/newest';

describe('Newest Posts Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
