import React, {
  type ChangeEvent,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type ReactNode,
  useRef,
} from 'react';
import { classNames } from '../../utils';

import { Input, type InputVariant } from '../Input';
import { useLocale } from '../GrapesProvider';

import { CurrencySelect } from './CurrencySelect';
import type { AmountInputCurrency } from './currency';

import styles from './AmountInput.module.scss';

export type AmountInputProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The currency to display.
   */
  currency: AmountInputCurrency;
  /**
   * Whether the AmountInput should fit its parent or content.
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * The visual style of the AmountInput.
   * @default default
   */
  variant?: InputVariant;
  /**
   * The id of the AmountInput.
   */
  id?: string;
  /**
   * Whether the AmountInput is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the AmountInput is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the AmountInput allows negative values.
   */
  hasNegativeValueAllowed?: boolean;
  /**
   * The name of the AmountInput, used when submitting an HTML form.
   */
  name?: string;
  /**
   * 	Temporary text that occupies the AmountInput when it is empty.
   */
  placeholder?: string;
  /**
   * Left addon of the input.
   */
  leftAddon?: ReactNode;
  /**
   * The current value (controlled).
   */
  value: number | null;
  /**
   * Handler that is called when the value changes.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>, newValue: number) => void;
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
} & (
  | // If the `AmountInput` has en editable currency, both props should always be passed
  {
      /**
       * The list of currencies to display in the dropdown.
       */
      currencies: AmountInputCurrency[];
      /**
       * Handler that is called when a currency is selected.
       */
      onSelectCurrency: (
        selectedCurrency: AmountInputCurrency,
        newValue: number,
      ) => void;
    }
  | {
      currencies?: never;
      onSelectCurrency?: never;
    }
);

export const AmountInput = ({
  className,
  currencies,
  currency,
  fit = 'content',
  variant = 'default',
  id,
  isDisabled,
  isInvalid,
  hasNegativeValueAllowed,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onSelectCurrency,
  ...rest
}: AmountInputProps) => {
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);

  const currencySymbol = getCurrencySymbol(locale, currency.key);
  const isCurrencyEditable = !!currencies && !!onSelectCurrency;

  const step = (10 ** -getCurrencyDecimals(currency.key)).toString();

  const formattedValue = getValue(value, currency, hasNegativeValueAllowed);
  return (
    <div
      className={classNames(
        styles.moneyInputWrapper,
        fit === 'parent' && styles.parentFitAmountInputWrapper,
        className,
      )}
    >
      <Input
        ref={inputRef}
        className={styles.moneyInput}
        fit={fit}
        variant={variant}
        id={id}
        name={name}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        onChange={(event) =>
          onChange(
            event,
            getValue(
              event.target.valueAsNumber,
              currency,
              hasNegativeValueAllowed,
            ),
          )
        }
        onFocus={onFocus}
        onBlur={onBlur}
        min={hasNegativeValueAllowed ? undefined : 0}
        onKeyDown={onKeyDown}
        onWheel={() => inputRef.current?.blur()} // Prevent wheel from increasing/decreasing the value
        type="number"
        step={step}
        value={
          formattedValue === null || Number.isNaN(formattedValue)
            ? ''
            : formattedValue
        }
        rightAddon={
          isCurrencyEditable ? (
            <CurrencySelect
              options={currencies}
              value={currency}
              isDisabled={isDisabled}
              onSelect={(event) =>
                onSelectCurrency(
                  event,
                  getValue(value, event, hasNegativeValueAllowed),
                )
              }
            />
          ) : (
            currencySymbol && (
              <div className={styles.moneyInputCurrencySymbol}>
                {currencySymbol}
              </div>
            )
          )
        }
        {...rest}
      />
    </div>
  );
};

const getValue = (
  value: number | null,
  currency: AmountInputCurrency,
  hasNegativeValueAllowed?: boolean,
): number => {
  const decimalPrecision = getCurrencyDecimals(currency.key);
  if (value !== null && !Number.isNaN(value)) {
    return roundValue(
      hasNegativeValueAllowed ? value : Math.abs(value),
      decimalPrecision,
    );
  }
  return Number.NaN;
};

const getCurrencySymbol = (
  locale: string,
  currencyKey: string,
): string | undefined => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyKey,
    currencyDisplay: 'narrowSymbol',
  })
    .formatToParts(0)
    .find((part) => part.type === 'currency')?.value;
};

function getCurrencyDecimals(currencyCode: string): number {
  const options = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).resolvedOptions();
  return options.maximumFractionDigits ?? 0;
}

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
const roundValue = (numberToRound: number, decimalPrecision: number): number =>
  Math.round((numberToRound + Number.EPSILON) * 10 ** decimalPrecision) /
  10 ** decimalPrecision;
