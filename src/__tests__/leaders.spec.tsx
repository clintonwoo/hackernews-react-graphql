/** @jest-environment jsdom */

import Page from '../../pages/leaders';

describe('Leaders Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
