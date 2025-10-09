import React, { type ChangeEventHandler } from 'react';
import { classNames } from '../../utils';

import styles from './SwitchInput.module.css';

export type SwitchInputProps = {
  /**
   * Whether the SwitchInput should be checked
   */
  isChecked: boolean;
  /**
   * Handler called when the SwitchInput's state changes
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * The element's unique identifier
   */
  id?: string;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Name of the input element
   */
  name?: string;
  /**
   * Whether the input is disabled. Default to false
   */
  isDisabled?: boolean;
};

/**
 * @deprecated Please use SwitchField instead.
 */
export const SwitchInput = ({
  className = '',
  id,
  name,
  isDisabled,
  isChecked,
  onChange,
  ...rest
}: SwitchInputProps) => (
  <span className={classNames(styles.switch, className)} {...rest}>
    <span className={styles.switchTrack}>
      <span
        className={classNames(
          styles.switchThumb,
          isChecked && styles.checkedSwitchThumb,
        )}
      />
    </span>
    <input
      name={name}
      id={id}
      type="checkbox"
      role="switch"
      className={styles.switchInput}
      onChange={onChange}
      checked={isChecked}
      disabled={isDisabled}
      aria-checked={isChecked ? 'true' : 'false'}
    />
  </span>
);
