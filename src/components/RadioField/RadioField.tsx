import React, { type ChangeEventHandler, type ReactNode } from 'react';
import { classNames } from '../../utils';

import { RadioInput } from '../RadioInput';
import { useRadioCheckState } from '../RadioGroup/useRadioCheckState';

import styles from './RadioField.module.scss';

export type RadioFieldProps = Readonly<{
  /**
   * className for the element
   */
  className?: string;
  /**
   * The name of the RadioField.
   * Optional within a RadioGroup
   */
  name?: string;
  /**
   * Whether the RadioField should be disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The id of the RadioField
   */
  id?: string;
  /**
   * Whether the RadioField should be checked.
   * Ignored within a RadioGroup.
   * @default false
   */
  isChecked?: boolean;
  /**
   * The current value
   */
  value: string;
  /**
   * The content to display as the label.
   */
  label: string | ReactNode;
  /**
   * Handler that is called when the value changes.
   * Ignored within a RadioGroup
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

export const RadioField = ({
  className,
  name,
  isDisabled,
  id,
  isChecked = false,
  value,
  label,
  onChange,
  ...rest
}: RadioFieldProps) => {
  const isRadioChecked = useRadioCheckState(value, isChecked);
  return (
    <label
      className={classNames(styles.radioField, className)}
      htmlFor={id}
      {...rest}
    >
      <RadioInput
        id={id}
        name={name}
        isDisabled={isDisabled}
        isChecked={isRadioChecked}
        value={value}
        onChange={onChange}
        className={styles.radioInput}
      />
      <span className={styles.checkboxFieldLabelText}>{label}</span>
    </label>
  );
};
