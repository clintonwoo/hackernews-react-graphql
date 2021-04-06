/** @jest-environment jsdom */

import Page from '../../pages/index';

describe('Home Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
