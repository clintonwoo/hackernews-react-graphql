/** @jest-environment jsdom */

import Page from '../../pages/login';

describe('Login Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
