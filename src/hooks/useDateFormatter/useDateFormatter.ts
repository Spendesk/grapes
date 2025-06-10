import { useContext } from 'react';

import { GrapesContext } from '../../components/GrapesProvider/GrapesContext';

export const DATE_FORMAT = {
  /**
   * Includes the day, month, year and the time
   * @example 'January 1, 2020 at 1:00 AM'
   */
  LONG_WITH_TIME: 'date_long_with_time',
  /**
   * Includes the day, month (generally truncated) and year
   * @example 'Jan 1, 2020'
   */
  MEDIUM: 'date_medium',
  /**
   * Includes the day, month and year in numeric numbers
   * @example '1/1/20'
   */
  SHORT: 'date_short',
  /**
   * Whether you need to use the Intl.DateTimeFormat API
   */
  CUSTOM: 'date_custom',
} as const;

type Keys = keyof typeof DATE_FORMAT;
export type DateFormat = (typeof DATE_FORMAT)[Keys];

function getOptionsFromFormat(
  format: DateFormat,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormatOptions {
  switch (format) {
    case DATE_FORMAT.LONG_WITH_TIME:
      return {
        dateStyle: 'long' as const,
        timeStyle: 'short' as const,
      };
    case DATE_FORMAT.MEDIUM:
    default:
      return {
        dateStyle: 'medium' as const,
      };
    case DATE_FORMAT.SHORT:
      return {
        dateStyle: 'short' as const,
      };
    case DATE_FORMAT.CUSTOM:
      return options;
  }
}

/**
 * Formats a date according the the locale and the formatting options
 * @param {string} locale The locale for your application as BCP 47 language tag.
 * @param {Date} date The date to format
 * @param {DATE_FORMAT} dateFormat The date format to use. @default DATE_FORMAT.MEDIUM
 * @param {Intl.DateTimeFormatOptions} options Options to use in case DATE_FORMAT.CUSTOM is used
 * @returns {string} A string representing the given date formatted
 */
export function dateFormatter(
  locale: string,
  date: Date,
  format: DateFormat = DATE_FORMAT.MEDIUM,
  options: Intl.DateTimeFormatOptions = {},
): string {
  if (date instanceof Date) {
    return new Intl.DateTimeFormat(
      locale,
      getOptionsFromFormat(format, options),
    ).format(date);
  }
  return '';
}

/**
 * @param {Date} date The date to format
 * @param {DATE_FORMAT} dateFormat The date format to use. @default DATE_FORMAT.MEDIUM
 * @param {Intl.DateTimeFormatOptions} options Options to use in case DATE_FORMAT.CUSTOM is used
 * @returns {string} A string representing the given date formatted
 */
export type DateFormatter = (
  date: Date,
  format?: DateFormat,
  options?: Intl.DateTimeFormatOptions,
) => string;
/**
 * Returns a function to format a date according to the locale and the formatting options
 * @returns {Function} function to format a date according to the locale and the formatting options
 */
export function useDateFormatter(): DateFormatter {
  const { locale } = useContext(GrapesContext);

  return (
    date: Date,
    format?: DateFormat,
    options?: Intl.DateTimeFormatOptions,
  ): string => dateFormatter(locale, date, format, options);
}
