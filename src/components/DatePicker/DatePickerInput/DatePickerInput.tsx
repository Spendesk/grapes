import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type ReactNode,
} from 'react';

import { Input, type InputVariant } from '../../Input';
import { Icon } from '../../Icon';
import { useLocale } from '../../GrapesProvider';
import { getCleaveLocalizedDatePattern } from '../utils';

import styles from './DatePickerInput.module.css';
import { useTranslate } from '../../../hooks/useTranslate';

export type DatePickerInputProps = {
  fit?: 'content' | 'parent';
  isDisabled?: boolean;
  calendarId: string;
  isCalendarOpen?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  value: Date | undefined;
  onChange: (date?: Date) => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  variant?: InputVariant;
  leftAddon?: ReactNode;
};

export const DatePickerInput = ({
  fit = 'content',
  isDisabled,
  isCalendarOpen,
  isInvalid,
  placeholder,
  value,
  onChange,
  openCalendar,
  closeCalendar,
  calendarId,
  ...rest
}: DatePickerInputProps) => {
  const locale = useLocale();
  const t = useTranslate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dateTimeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    [locale],
  );

  const [internalValue, setInternalValue] = useState(() =>
    value ? dateTimeFormat.format(value) : '',
  );
  useEffect(() => {
    const dateAsString = value ? dateTimeFormat.format(value) : '';
    setInternalValue(dateAsString);
  }, [value, dateTimeFormat]);

  const { datePattern, delimiter } = getCleaveLocalizedDatePattern(
    dateTimeFormat,
    new Date(),
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInternalValue(newValue);

    if (!newValue) {
      onChange();
    }

    const dateReg = new RegExp(`\\d{2}${delimiter}\\d{2}${delimiter}\\d{4}`);
    if (!dateReg.test(newValue)) {
      // if value isn't a valid date format, we don't try to parse it
      return;
    }

    const parts = newValue.split(delimiter);

    const dateIndex = datePattern.findIndex((pattern) => pattern === 'd');
    const monthIndex = datePattern.findIndex((pattern) => pattern === 'm');
    const yearIndex = 2; // We only support year at the end of the value

    const year = Number(parts[yearIndex]);
    const month = Number(parts[monthIndex]) - 1; // January is 0 in JS
    const date = Number(parts[dateIndex]);

    onChange(new Date(year, month, date));
  }

  function handleBlur() {
    const dateAsString = value ? dateTimeFormat.format(value) : '';
    setInternalValue(dateAsString);
  }

  function handleClick() {
    if (isCalendarOpen) {
      closeCalendar();
      buttonRef.current?.blur();
    } else {
      openCalendar();
    }
  }

  return (
    <Input
      fit={fit}
      isDisabled={isDisabled}
      className={styles.datePickerInput}
      isInvalid={isInvalid}
      rightAddon={
        <button
          ref={buttonRef}
          aria-expanded={isCalendarOpen}
          aria-controls={calendarId}
          onClick={handleClick}
          aria-haspopup="dialog"
          aria-label={isCalendarOpen ? t('close') : t('openCalendar')}
          className={styles.toggleCalendar}
          type="button"
        >
          <Icon
            name="calendar"
            aria-hidden="true"
            className={styles.datePickerInputIcon}
          />
        </button>
      }
      maskOptions={{
        date: true,
        datePattern,
        delimiter,
      }}
      placeholder={placeholder}
      value={internalValue}
      onFocus={openCalendar}
      onBlur={handleBlur}
      onChange={handleChange}
      {...rest}
    />
  );
};
