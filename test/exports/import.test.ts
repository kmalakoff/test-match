import assert from 'assert';
// @ts-ignore
import match from 'test-match';

describe('exports .ts', () => {
  it('named exports', () => {
    assert.equal(typeof match, 'function');
  });
});
