/** @jest-environment jsdom */

import Page from '../../pages/formatdoc';

describe('Format Doc Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
