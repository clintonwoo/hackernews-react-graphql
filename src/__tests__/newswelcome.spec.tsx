/** @jest-environment jsdom */

import Page from '../../pages/newswelcome';

describe('Welcome Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
