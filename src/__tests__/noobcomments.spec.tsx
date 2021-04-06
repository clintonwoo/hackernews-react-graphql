/** @jest-environment jsdom */

import Page from '../../pages/noobcomments';

describe('Noob Comments Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
