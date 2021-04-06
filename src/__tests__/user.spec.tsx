/** @jest-environment jsdom */

import Page from '../../pages/user';

describe('User Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
