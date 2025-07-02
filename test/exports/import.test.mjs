import assert from 'assert';
import match from 'test-match';

describe('exports .mjs', () => {
  it('named exports', () => {
    assert.equal(typeof match, 'function');
  });
});
