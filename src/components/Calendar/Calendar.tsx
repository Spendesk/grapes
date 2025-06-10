import React, { useMemo, useState, useEffect } from 'react';
import { classNames } from '../../utils';

import { useLocale } from '../GrapesProvider';
import { IconButton } from '../IconButton';
import {
  isSameDay,
  isDayBefore,
  isDayAfter,
  getDateInRange,
} from '../DatePicker/utils/';
import { useTranslate } from '../../hooks/useTranslate';

import styles from './Calendar.module.scss';
import { colors } from '../../colors';

export type CalendarProps = {
  /**
   * The current date.
   */
  value: Date | undefined;
  /**
   * The earliest date allowed by the Calendar
   */
  minDate?: Date;
  /**
   * The oldest date allowed by the Calendar
   */
  maxDate?: Date;
  /**
   * Handler that is called when a date is clicked.
   */
  onClick: (date: Date) => void;
  /**
   * className for the element
   */
  className?: string;
};

export const Calendar = ({
  value,
  onClick,
  maxDate,
  minDate,
  className,
}: CalendarProps) => {
  const locale = useLocale();
  const [date, setDate] = useState(new Date());
  const t = useTranslate();

  useEffect(() => {
    setDate(getDateInRange(value ?? new Date(), minDate, maxDate));
  }, [value, minDate, maxDate]);

  const month = date.getMonth();
  const year = date.getFullYear();

  const IntlLocale = new Intl.Locale(locale);

  // Used to display either Monday or Sunday as first day of the week
  let weekOffset = /us/gi.test(locale) ? 7 : 1;

  // @ts-expect-error getWeekInfo exist on Locale
  if (IntlLocale.getWeekInfo !== undefined) {
    // @ts-expect-error getWeekInfo exist on Locale
    const { firstDay } = IntlLocale.getWeekInfo();
    weekOffset = firstDay;
  }

  const firstDate = new Date(year, month, 1);
  const firstWeekday = firstDate.getDay();
  const lastDate = new Date(year, month + 1, 0);
  const daysInMonth = lastDate.getDate();

  const calendar = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1),
  );

  const weekdays = useMemo(() => {
    const dayDtf = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    });
    return Array.from(
      { length: 7 },
      (_, i) => dayDtf.format(new Date(2024, 6, i + weekOffset)), // target july 2024 because first day was monday
    );
  }, [weekOffset, locale]);

  const monthTimeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
      }),
    [locale],
  );
  const accessiblityTimeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'full',
      }),
    [locale],
  );

  return (
    <div className={className}>
      <div className={styles.header}>
        <IconButton
          iconName="chevron-left"
          iconColor={colors.contentDecorativeIcon}
          onClick={() => setDate(new Date(year, month - 1, 1))}
          aria-label={t('previousMonth')}
        />
        <p className={styles.month}>{monthTimeFormat.format(date)}</p>
        <IconButton
          iconColor={colors.contentDecorativeIcon}
          iconName="chevron-right"
          onClick={() => setDate(new Date(year, month + 1, 1))}
          aria-label={t('nextMonth')}
        />
      </div>
      <div className={styles.grid}>
        {weekdays.map((weekday) => (
          <p key={weekday} aria-hidden="true" className={styles.weekday}>
            {weekday}
          </p>
        ))}
        {calendar.map((date, i) => {
          const isSelectedDate = isSameDay(date, value);
          const isDateAfter = isDayAfter(maxDate, date);
          const isDateBefore = isDayBefore(minDate, date);

          return (
            <button
              key={date.getDate()}
              type="button"
              onClick={() => onClick(date)}
              aria-label={accessiblityTimeFormat.format(date)}
              className={classNames(
                styles.day,
                isSelectedDate && styles.selected,
              )}
              disabled={isDateAfter || isDateBefore}
              tabIndex={isSelectedDate ? -1 : 0}
              style={
                i === 0
                  ? {
                      gridColumnStart:
                        (firstWeekday + (8 - weekOffset)) % 7 || 7,
                    } // firstWeekday + distance between monday and weekOffset
                  : undefined
              }
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
