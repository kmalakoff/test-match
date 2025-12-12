import isAbsolute from 'is-absolute';
import minimatch from 'minimatch';
import path from 'path-posix';
import unixify from 'unixify';

export interface Options {
  cwd?: string;
  include?: string | string[];
  exclude?: string | string[];
}
export type Matcher = (filePath: string) => boolean;

const isArray = Array.isArray || ((x) => Object.prototype.toString.call(x) === '[object Array]');

// Case sensitivity: Windows/MSYS/Cygwin = insensitive, Unix = sensitive
const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
let nocase = isWindows;

export function _setNocase(value: boolean): void {
  nocase = value;
}
export function _getNocase(): boolean {
  return nocase;
}

function startsWith(string, check) {
  if (nocase) {
    string = string.toLowerCase();
    check = check.toLowerCase();
  }
  return string.lastIndexOf(check, 0) === 0;
}

export default function createMatcher(options: Options): Matcher {
  const cwd = options.cwd === undefined ? undefined : unixify(options.cwd);
  const include = options.include === undefined ? [] : options.include;
  const exclude = options.exclude === undefined ? [] : options.exclude;

  function matchFn(condition) {
    let pattern = unixify(condition);
    if (cwd && !isAbsolute(pattern) && pattern.indexOf('*') !== 0) pattern = path.join(cwd, pattern);

    return function match(filePath) {
      return startsWith(filePath, pattern) || minimatch(filePath, pattern, { nocase: nocase, dot: true });
    };
  }

  const includes = (isArray(include) ? (include as string[]) : (include as string).split(',')).map(matchFn);
  const excludes = (isArray(exclude) ? (exclude as string[]) : ((exclude as string) || '').split(',')).map(matchFn);

  return function match(filePath) {
    filePath = unixify(filePath);
    for (let i = 0; i < excludes.length; ++i) {
      if (excludes[i](filePath)) return false;
    }
    for (let j = 0; j < includes.length; ++j) {
      if (includes[j](filePath)) return true;
    }
    return !includes.length;
  };
}
