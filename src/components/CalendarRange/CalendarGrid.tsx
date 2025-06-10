import React, { useMemo } from 'react';
import { classNames } from '../../utils';

import { isSameDay, isDayBefore, isDayAfter } from '../DatePicker/utils';
import { isBetween } from './utils/isBetween';
import { useLocale } from '../GrapesProvider';
import type { DateRange } from './CalendarRange';

import styles from './CalendarGrid.module.scss';

export type CalendarGridProps = {
  /**
   * The current year.
   */
  year: number;
  /**
   * The current month.
   */
  month: number;
  /**
   * The earliest date allowed by the Calendar
   */
  minDate?: Date;
  /**
   * The oldest date allowed by the Calendar
   */
  maxDate?: Date;
  /**
   * Offset to set the week start
   */
  weekOffset: number;
  /**
   * Handler that is called when a date is clicked.
   */
  onClick: (date: Date) => void;
  /**
   * The current range date.
   */
  value: DateRange;
  /**
   * DateTimeFormat to label every day
   */
  accessiblityTimeFormat: Intl.DateTimeFormat;
};

export const CalendarGrid = ({
  year,
  month,
  weekOffset,
  maxDate,
  minDate,
  onClick,
  value,
  accessiblityTimeFormat,
}: CalendarGridProps) => {
  const locale = useLocale();

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
      (_, i) => dayDtf.format(new Date(2021, 7, i + 1 - weekOffset)), // target august 2021 because first day was sunday
    );
  }, [weekOffset, locale]);

  return (
    <div className={styles.grid}>
      {weekdays.map((weekday) => (
        <p key={weekday} aria-hidden="true" className={styles.weekday}>
          {weekday}
        </p>
      ))}
      {calendar.map((date, i) => {
        const isSelectedDate = value.some((dateRange) =>
          isSameDay(date, dateRange),
        );
        const isDateAfter = isDayAfter(maxDate, date);
        const isDateBefore = isDayBefore(minDate, date);
        const inRange = isBetween(date, value);

        return (
          <button
            key={date.getDate()}
            type="button"
            onClick={() => onClick(date)}
            aria-label={accessiblityTimeFormat.format(date)}
            className={classNames(
              styles.dayBtn,
              isSelectedDate && styles.selected,
            )}
            data-inrange={inRange ? 'true' : 'false'}
            disabled={isDateAfter || isDateBefore}
            tabIndex={isSelectedDate ? -1 : 0}
            style={
              i === 0
                ? { gridColumnStart: firstWeekday + 1 + weekOffset || 7 } // Grid column start at 1 instead of 0
                : undefined
            }
          >
            <span>{date.getDate()}</span>
          </button>
        );
      })}
    </div>
  );
};
