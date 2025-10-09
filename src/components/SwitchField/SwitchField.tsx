import React, { type ChangeEventHandler, type ReactNode } from 'react';
import { classNames } from '../../utils';

import { SwitchInput } from '../SwitchInput';

import styles from './SwitchField.module.css';
import { useId } from '../../hooks/useId';

export type SwitchFieldProps = Readonly<{
  /**
   * Content to render as the SwitchInput's label
   */
  label: ReactNode;
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
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the input should fit the content or the parent. Default to content
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * Content to render as the SwitchInput's help text
   */
  helpText?: ReactNode;
}>;

export const SwitchField = ({
  className,
  name = '',
  isDisabled = false,
  fit = 'content',
  helpText,
  id: providedId,
  isChecked,
  label,
  onChange,
  ...rest
}: SwitchFieldProps) => {
  const grapesId = useId();
  const id = providedId ?? grapesId;

  return (
    <label
      className={classNames(styles.switchField, className)}
      data-fit={fit}
      htmlFor={id}
      {...rest}
    >
      <span className={styles.switchFieldText}>{label}</span>
      <SwitchInput
        id={id}
        name={name}
        isDisabled={isDisabled}
        isChecked={isChecked}
        onChange={onChange}
      />
      {helpText && <div className={styles.switchFieldHelpText}>{helpText}</div>}
    </label>
  );
};
