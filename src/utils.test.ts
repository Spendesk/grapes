/* eslint-disable no-constant-binary-expression */

import { classNames } from './utils';

describe('#classNames', () => {
  it.each([
    { names: [], expected: '' },
    { names: [undefined, null], expected: '' },
    { names: ['foo', 'bar'], expected: 'foo bar' },
    { names: ['foo', undefined, false], expected: 'foo' },
    { names: ['foo', false && 'bar', 'fizz'], expected: 'foo fizz' },
    { names: ['foo', true && 'bar', 'fizz'], expected: 'foo bar fizz' },
    { names: [true && false && 'bar', null], expected: '' },
    { names: ['foo', ''], expected: 'foo' },
  ])('should return $expected', ({ names, expected }) => {
    expect(classNames(...names)).toBe(expected);
  });
});
