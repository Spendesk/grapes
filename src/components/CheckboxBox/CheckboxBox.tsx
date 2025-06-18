import React, { type ChangeEventHandler, type ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './CheckboxBox.module.scss';
import { CheckboxInput } from '../CheckboxInput';
import { useId } from '../../hooks/useId';
import { HighlightIcon } from '../HighlightIcon';
import type { IconName } from '../Icon';

export type CheckboxBoxProps = {
  /**
   * The name of the CheckboxBox, used when submitting an HTML form.
   */
  name?: string;
  /**
   * The content to display as the label.
   */
  label: string;
  /**
   * The content to display as the description.
   */
  description?: ReactNode;
  /**
   * The current value
   */
  value?: string;
  /**
   * Whether the CheckboxBox is checked.
   */
  isChecked: boolean;
  /**
   * Whether the CheckboxBox should be disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the CheckboxBox is indeterminate.
   */
  isIndeterminate?: boolean;
  /**
   * The icon to display in the button
   */
  iconName?: IconName;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Handler that is called when the value changes.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const CheckboxBox = ({
  label,
  description,
  value,
  isDisabled,
  isChecked,
  isIndeterminate,
  iconName,
  className,
  onChange,
  name,
  ...rest
}: CheckboxBoxProps) => {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <label
      className={classNames(
        styles.checkboxBox,
        iconName && styles.checkboxBoxWithIcon,
        className,
      )}
      {...rest}
    >
      <CheckboxInput
        className={styles.checkboxInput}
        name={name}
        isDisabled={isDisabled}
        isIndeterminate={isIndeterminate}
        isChecked={isChecked}
        value={value}
        onChange={onChange}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
      />
      {iconName ? (
        <HighlightIcon name={iconName} size={32} variant="purple" aria-hidden />
      ) : null}
      <div>
        <div className={styles.label} id={labelId}>
          {label}
        </div>
        {description ? (
          <span id={descriptionId} className={styles.description}>
            {description}
          </span>
        ) : null}
      </div>
    </label>
  );
};
