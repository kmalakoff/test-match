import assert from 'assert';
import match from 'test-match';

describe('match', () => {
  it('include', () => {
    const test = match({ include: 'yes' });

    assert.ok(test('yes')); // true
    assert.ok(!test('no')); // false
  });

  it('exclude', () => {
    const test = match({ exclude: 'yes' });

    assert.ok(!test('yes')); // true
    assert.ok(test('no')); // false
  });

  it('include cwd', () => {
    const test = match({ cwd: '/path/to', include: 'yes' });

    assert.ok(test('/path/to/yes')); // true
    assert.ok(!test('/path/to/no')); // false
  });

  it('exclude cwd', () => {
    const test = match({ cwd: '/path/to', exclude: 'yes' });

    assert.ok(!test('/path/to/yes')); // true
    assert.ok(test('/path/to/no')); // false
  });

  it('glob', () => {
    const test = match({ include: 'react-*', exclude: 'react-native-*' });

    assert.ok(test('react-dom')); // true
    assert.ok(!test('react-native-aria')); // false
  });
});
