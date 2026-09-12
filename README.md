# test-match

Create a reusable include/exclude matcher for file paths.

```bash
npm install test-match
```

```js
import match from 'test-match';

const isReactPackage = match({
  include: 'react-*',
  exclude: 'react-native-*',
});

isReactPackage('react-dom'); // true
isReactPackage('react-native-aria'); // false
```

`include` and `exclude` accept a pattern, a comma-separated string, or an array
of patterns. Exclusions take precedence. Without an include pattern, every path
not excluded matches. Set `cwd` to resolve relative patterns against a project
directory. Matching is case-insensitive on Windows, MSYS, and Cygwin.
