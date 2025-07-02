const assert = require('assert');

const match = require('test-match');

describe('exports .cjs', () => {
  it('named exports', () => {
    assert.equal(typeof match, 'function');
  });
});
