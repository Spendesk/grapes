import React, { useRef, type ReactNode } from 'react';

import { DatePickerInput } from './DatePickerInput';
import { Calendar } from '../Calendar';
import { useWindowEvent } from '../../hooks/useWindowEvent';

import { useId } from '../../hooks/useId';
import { getDateInRange } from './utils/';
import { type Placement, classNames, getStyleFromPlacement } from '../../utils';
import { useFormFieldContext } from '../FormField/FormFieldContext';
import type { InputVariant } from '../Input';
import { useAnimationState } from '../../hooks/useAnimationState';

import styles from './DatePicker.module.css';
import commonStyles from '../../theme/placeholders/common.module.css';

export type DatePickerProps = {
  /**
   * id for the DatePicker input.
   * Used it with htmlFor props from FormField
   */
  id?: string;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Whether the DatePicker should fit its parents or content
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * Whether the DatePicker is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the DatePicker is invalid.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Temporary text that occupies the DatePicker when it is empty.
   */
  placeholder?: string;
  /**
   * The current value.
   */
  value: Date | undefined;
  /**
   * Handler that is called when the value changes.
   */
  onChange(newDate?: Date): void;
  /**
   * The earliest date allowed by the input
   */
  minDate?: Date;
  /**
   * The oldest date allowed by the input
   */
  maxDate?: Date;
  /**
   * Whether the DatePicker should be aligned at the start or end of the trigger
   * @default bottom-start
   */
  placement?: Placement;
  /**
   * Left addon of the DatePicker.
   */
  leftAddon?: ReactNode;
  /**
   * The visual style of the DatePicker.
   */
  variant?: InputVariant;
};

/**
 * Allows user to choose or enter a Date
 */
export const DatePicker = ({
  fit = 'content',
  isDisabled = false,
  isInvalid,
  placeholder,
  value,
  onChange,
  minDate,
  maxDate,
  placement = 'bottom-start',
  ...rest
}: DatePickerProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, isClosing, openCalendar, closeCalendar] =
    useAnimationState('close');
  const calendarId = useId();
  const formFieldContext = useFormFieldContext();

  useWindowEvent('mousedown', (event) => {
    const { current: el } = rootRef;

    if (el && el.contains(event.target as Node)) {
      return;
    }
    closeCalendar();
  });

  useWindowEvent(
    'focus',
    () => {
      const { current: el } = rootRef;

      if (el && el.contains(document.activeElement)) {
        return;
      }
      closeCalendar();
    },
    true,
  );

  useWindowEvent(
    'keydown',
    (e: KeyboardEvent) => {
      const { current: el } = rootRef;

      if (el && el.contains(document.activeElement) && e.key === 'Escape') {
        closeCalendar();
      }
    },
    true,
  );

  function handleCalendarChange(date: Date) {
    closeCalendar();
    onChange(date);
  }

  function handleInputChange(date?: Date) {
    if (date) {
      const newDate = getDateInRange(date, minDate, maxDate);
      return onChange(newDate);
    }
    return onChange();
  }

  return (
    <div
      className={classNames(styles.container, commonStyles.dropdownContent)}
      ref={rootRef}
    >
      <DatePickerInput
        placeholder={placeholder}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isCalendarOpen={isVisible}
        fit={fit}
        calendarId={calendarId}
        openCalendar={() => openCalendar()}
        closeCalendar={() => closeCalendar()}
        value={value}
        onChange={handleInputChange}
        {...rest}
      />
      {isVisible && (
        <div
          id={calendarId}
          className={styles.calendar}
          role="dialog"
          aria-labelledby={formFieldContext?.labelId}
          style={getStyleFromPlacement(placement)}
          data-closing={isClosing}
          onAnimationEnd={(e) => {
            if (e.animationName === styles.datePickerOut) {
              close();
            }
          }}
        >
          <Calendar
            onClick={handleCalendarChange}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};
