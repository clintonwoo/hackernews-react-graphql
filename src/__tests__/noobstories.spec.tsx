/** @jest-environment jsdom */
import Page from '../../pages/noobstories';

describe('Noob Stories Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
