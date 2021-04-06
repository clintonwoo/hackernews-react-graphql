/** @jest-environment jsdom */

import Page from '../../pages/newpoll';

describe('New Poll Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
