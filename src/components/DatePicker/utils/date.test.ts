import { isSameDay, isDayAfter, isDayBefore } from './date';

describe('#isSameDay', () => {
  it.each([
    [new Date(2021, 1, 1), new Date(2021, 1, 1), true],
    [new Date(2021, 1, 1, 15), new Date(2021, 1, 1, 12), true],
    [new Date(2021, 1, 2), new Date(2021, 1, 1), false],
    [new Date(2022, 1, 1), new Date(2021, 1, 1), false],
  ])('compares %p and %p', (dateA: Date, dateB: Date, expected: boolean) => {
    expect(isSameDay(dateA, dateB)).toBe(expected);
  });
});

describe('#isDayAfter', () => {
  it.each([
    [new Date(2021, 1, 1), new Date(2021, 1, 1), false],
    [undefined, new Date(2021, 1, 1), false],
    [new Date(2021, 1, 1), undefined, false],
    [new Date(2021, 1, 1, 15), new Date(2021, 1, 1, 12), false],
    [new Date(2021, 1, 2), new Date(2021, 1, 1), false],
    [new Date(2022, 1, 1), new Date(2021, 1, 1), false],
    [new Date(2021, 1, 1), new Date(2022, 1, 1), true],
    [new Date(2021, 1, 1), new Date(2021, 1, 2), true],
  ])(
    'compares %p and %p',
    (dateA: Date | undefined, dateB: Date | undefined, expected: boolean) => {
      expect(isDayAfter(dateA, dateB)).toBe(expected);
    },
  );
});
describe('#isDayBefore', () => {
  it.each([
    [new Date(2021, 1, 1), new Date(2021, 1, 1), false],
    [undefined, new Date(2021, 1, 1), false],
    [new Date(2021, 1, 1), undefined, false],
    [new Date(2021, 1, 1, 15), new Date(2021, 1, 1, 12), false],
    [new Date(2021, 1, 2), new Date(2021, 1, 1), true],
    [new Date(2022, 1, 1), new Date(2021, 1, 1), true],
    [new Date(2021, 1, 1), new Date(2022, 1, 1), false],
    [new Date(2021, 1, 1), new Date(2021, 1, 2), false],
  ])(
    'compares %p and %p',
    (dateA: Date | undefined, dateB: Date | undefined, expected: boolean) => {
      expect(isDayBefore(dateA, dateB)).toBe(expected);
    },
  );
});
