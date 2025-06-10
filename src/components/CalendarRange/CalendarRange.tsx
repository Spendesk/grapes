import React, { useMemo, useState } from 'react';

import { useLocale } from '../GrapesProvider';
import { IconButton } from '../IconButton';
import { CalendarGrid } from './CalendarGrid';
import {
  isDayBefore,
  isSameDay,
  isDayAfter,
  getDateInRange,
} from '../DatePicker/utils/';
import { useTranslate } from '../../hooks/useTranslate';

import styles from './CalendarRange.module.css';
import { classNames } from '../../utils';
import { Button } from '../Button';
import { colors } from '../../colors';

export type DateRange = [Date | undefined, Date | undefined];
export type CalendarRangeProps = {
  /**
   * The current range.
   */
  value: DateRange;
  /**
   * The earliest date allowed by the Calendar
   */
  minDate?: Date;
  /**
   * The oldest date allowed by the Calendar
   */
  maxDate?: Date;
  /**
   * How many calendars to display. Defaults to 2
   */
  numberOfCalendars?: 1 | 2;
  /**
   * Handler that is called when a date is clicked.
   */
  onClick: (range: DateRange) => void;
};

export const CalendarRange = ({
  value,
  onClick,
  maxDate,
  minDate,
  numberOfCalendars = 2,
}: CalendarRangeProps) => {
  const locale = useLocale();
  const t = useTranslate();
  const [start, end] = value;
  const [navigationDate, setNavigationDate] = useState(() => {
    if (end) {
      return end;
    }
    if (start) {
      return start;
    }
    if (maxDate) {
      return maxDate;
    }
    return new Date();
  });

  const hasOneCalendar = numberOfCalendars === 1;

  const month = navigationDate.getMonth();
  const year = navigationDate.getFullYear();
  const previousMonth = new Date(year, month - 1, 1);

  // Used to display either Monday or Sunday as first day of the week
  const weekOffset = /us/gi.test(locale) ? 0 : -1;

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

  function isDisabled(month: number) {
    const isCurrentMonthBeforeMinDate = isDayBefore(
      minDate,
      new Date(year, month + 1, 0),
    );
    const isCurrentMonthAfterMaxDate = isDayAfter(
      maxDate,
      new Date(year, month, 1),
    );

    return isCurrentMonthBeforeMinDate || isCurrentMonthAfterMaxDate;
  }

  function handleClickOnMonth(month: number) {
    const start = getDateInRange(new Date(year, month, 1), minDate, maxDate);
    const end = getDateInRange(
      new Date(year, month + 1, 0, 23, 59, 59, 999),
      minDate,
      maxDate,
    );
    onClick([start, end]);
  }

  function handleClick(date: Date) {
    const completeRange = value.every((date) => date !== undefined);
    const emptyRange = value.every((date) => date === undefined);
    if (completeRange || emptyRange) {
      return onClick([date, undefined]);
    }

    const [start] = value;
    if (isDayBefore(date, start)) {
      date.setHours(23, 59, 59, 999);
      return onClick([start, date]);
    }
    if (isSameDay(start, date)) {
      return onClick([undefined, undefined]);
    }
    start?.setHours(23, 59, 59, 999);
    onClick([date, start]);
  }

  return (
    <div
      className={classNames(
        styles.container,
        hasOneCalendar && styles.singleContainer,
      )}
    >
      <IconButton
        iconName="chevron-left"
        iconColor={colors.contentDecorativeIcon}
        onClick={() => setNavigationDate(new Date(year, month - 1, 1))}
        aria-label={t('previousMonth')}
      />
      {!hasOneCalendar && (
        <Button
          className={styles.leftTitle}
          variant="tertiaryNeutral"
          isDisabled={isDisabled(month - 1)}
          onClick={() => {
            handleClickOnMonth(month - 1);
          }}
          text={monthTimeFormat.format(new Date(year, month - 1, 1))}
        />
      )}
      <Button
        variant="tertiaryNeutral"
        className={styles.rightTitle}
        text={monthTimeFormat.format(navigationDate)}
        isDisabled={isDisabled(month)}
        onClick={() => {
          handleClickOnMonth(month);
        }}
      />
      <IconButton
        iconName="chevron-right"
        iconColor={colors.contentDecorativeIcon}
        onClick={() => setNavigationDate(new Date(year, month + 1, 1))}
        aria-label={t('nextMonth')}
      />
      {!hasOneCalendar && (
        <CalendarGrid
          year={previousMonth.getFullYear()}
          month={previousMonth.getMonth()}
          weekOffset={weekOffset}
          maxDate={maxDate}
          minDate={minDate}
          onClick={handleClick}
          accessiblityTimeFormat={accessiblityTimeFormat}
          value={value}
        />
      )}
      <CalendarGrid
        year={year}
        month={month}
        weekOffset={weekOffset}
        maxDate={maxDate}
        minDate={minDate}
        onClick={handleClick}
        accessiblityTimeFormat={accessiblityTimeFormat}
        value={value}
      />
    </div>
  );
};
