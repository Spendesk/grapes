import React, { type ChangeEventHandler, type ReactNode } from 'react';
import { classNames } from '../../utils';

import { CheckboxInput } from '../CheckboxInput';

import styles from './CheckboxField.module.css';

export type CheckboxFieldProps = Readonly<{
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The name of the CheckboxField, used when submitting an HTML form.
   */
  name?: string;
  /**
   * Whether the CheckboxField is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the checkbox is indeterminate.
   */
  isIndeterminate?: boolean;
  /**
   * Whether the CheckboxField should fit its parent or content.
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * The id of the CheckboxField.
   */
  id?: string;
  /**
   * Whether the checkbox is checked.
   */
  isChecked: boolean;
  /**
   * Content to display in the label.
   */
  label: ReactNode;
  /**
   * The current value (controlled).
   */
  value?: string;
  /**
   * Handler that is called when the value changes.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
}>;

export const CheckboxField = ({
  className,
  name = '',
  isDisabled,
  isIndeterminate,
  fit = 'content',
  id,
  isChecked,
  label,
  value,
  onChange,
  ...rest
}: CheckboxFieldProps) => {
  return (
    <label
      className={classNames(styles.checkboxField, className)}
      data-fit={fit}
      htmlFor={id}
      {...rest}
    >
      <CheckboxInput
        id={id}
        name={name}
        isDisabled={isDisabled}
        isIndeterminate={isIndeterminate}
        isChecked={isChecked}
        value={value}
        onChange={onChange}
      />
      <span className={styles.checkboxFieldText}>{label}</span>
    </label>
  );
};
