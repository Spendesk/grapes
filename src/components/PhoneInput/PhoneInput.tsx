import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useRef,
} from 'react';
import { classNames } from '../../utils';

import { Input } from '../Input';

import { CountrySelect } from './CountrySelect';
import { Country } from './country';

import styles from './PhoneInput.module.scss';

export type PhoneInputProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * The list of countries to display in the country dropdown of the phone input
   */
  countries: Country[];
  /**
   * The selected country for the phone number (e.g. FR)
   */
  country: string;
  /**
   * The calling code for the phone number (e.g. +33)
   */
  callingCode: string;
  /**
   * Whether the PhoneInput should fit its parent or content
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * The id of the PhoneInput
   */
  id?: string;
  /**
   * Whether the PhoneInput is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the PhoneInput is invalid.
   */
  isInvalid?: boolean;
  /**
   * The name of the PhoneInput, used when submitting an HTML form
   */
  name?: string;
  /**
   * 	Temporary text that occupies the PhoneInput when it is empty.
   */
  placeholder?: string;
  /**
   * The current value (controlled).
   */
  value: string | null;
  /**
   * Handler that is called when the country changes.
   */
  onSelectCountry: (selectedCountry: Country) => void;
  /**
   * Handler that is called when the value changes.
   */
  onChange: (newValue: string) => void;
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when a key is pressed.
   */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  /**
   * Function which formats the phone number (for example with spaces or removing the leading zero)
   */
  formatPhoneNumber: (
    value: string | null,
    country: string,
    callingCode: string,
  ) => string;
};

export const PhoneInput = /*@__PURE__*/ forwardRef<
  HTMLInputElement,
  PhoneInputProps
>(
  (
    {
      className,
      countries,
      country,
      callingCode,
      fit = 'content',
      id,
      isDisabled,
      isInvalid,
      name,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onSelectCountry,
      formatPhoneNumber,
      ...rest
    }: PhoneInputProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLDivElement>(null);

    return (
      <div
        className={classNames(
          styles.phoneInputWrapper,
          fit === 'parent' && styles.parentFitPhoneInputWrapper,
          className,
        )}
        ref={inputRef}
      >
        <Input
          className={styles.phoneInput}
          fit={fit}
          id={id}
          ref={ref}
          name={name}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          onChange={(event) => {
            onChange(`+${callingCode} ${event.target.value}`);
          }}
          onFocus={(event) => {
            onFocus?.(event);
          }}
          onBlur={(event) => {
            onBlur?.(event);
          }}
          onKeyDown={onKeyDown}
          type="text"
          value={value ? formatPhoneNumber(value, country, callingCode) : ''}
          leftAddon={
            <>
              <CountrySelect
                options={countries}
                value={{ key: country, label: '' }}
                isDisabled={isDisabled}
                onSelect={(selectedCountry) => {
                  onSelectCountry(selectedCountry);
                }}
              />
              <div className={styles.phoneInputCallingCode}>
                (+{callingCode})
              </div>
            </>
          }
          {...rest}
        />
      </div>
    );
  },
);
