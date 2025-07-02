## test-match

Test string matches with cwd, include, exclude.

```
import match from 'test-match';

const test = match({ include: 'react-*', exclude: 'react-native-*' })

test('react-dom'); // true
test('react-native-aria'); // false
```