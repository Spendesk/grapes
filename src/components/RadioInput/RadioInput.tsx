import React, { type ChangeEventHandler } from 'react';
import { classNames } from '../../utils';

import styles from './RadioInput.module.css';
import { useRadioState } from './useRadioState';

export type RadioInputProps = Readonly<{
  /**
   * className for the element
   */
  className?: string;
  /**
   * The id of the RadioInput
   */
  id?: string;
  /**
   * The name of the RadioInput.
   * Ignored within a RadioGroup
   */
  name?: string;
  /**
   * Whether the RadioInput should be disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the RadioInput should be checked.
   * Ignored within a RadioGroup
   */
  isChecked?: boolean;
  /**
   * The current value
   */
  value: string;
  /**
   * Handler that is called when the value changes.
   * Ignored within a RadioGroup
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

export const RadioInput = (props: RadioInputProps) => {
  const {
    className = '',
    id = '',
    name = '',
    isDisabled = false,
    isChecked,
    value,
    onChange,
    ...rest
  } = useRadioState(props);

  return (
    <span className={classNames(styles.radio, className)}>
      <input
        className={styles.radioInput}
        name={name}
        id={id}
        type="radio"
        disabled={isDisabled}
        checked={isChecked}
        value={value}
        onChange={onChange}
        aria-checked={isChecked}
        {...rest}
      />
    </span>
  );
};
