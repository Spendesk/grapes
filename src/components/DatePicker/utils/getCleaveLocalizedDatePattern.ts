export const getCleaveLocalizedDatePattern = (
  dtf: Intl.DateTimeFormat,
  date: Date,
): { datePattern: string[]; delimiter: string } => {
  const parts = dtf.formatToParts(date);

  const datePattern = parts
    .filter((part) => ['month', 'day', 'year'].includes(part.type))
    .map((part) => {
      switch (part.type) {
        case 'month':
          return 'm';
        case 'day':
          return 'd';
        default:
        case 'year':
          return 'Y';
      }
    });
  const delimiter = parts.find((item) => item.type === 'literal')?.value ?? '/';

  return { datePattern, delimiter };
};
