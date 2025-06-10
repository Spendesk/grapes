import React, { ReactNode } from 'react';
import { useId } from '../../hooks/useId';
import { classNames } from '../../utils';
import { IconName } from '../Icon';
import { RadioInput } from '../RadioInput';
import { useRadioCheckState } from '../RadioGroup/useRadioCheckState';

import styles from './RadioBox.module.scss';
import { HighlightIcon } from '../HighlightIcon';

export type RadioBoxProps<K> = {
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
  value: K;
  /**
   * The icon to display in the button
   */
  iconName?: IconName;
  /**
   * Whether the RadioBox should be disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * className for the element
   */
  className?: string;
  /**
   * The id of the RadioBox
   */
  id?: string;
};

/**
 * To be used inside a RadioGroup
 */
export const RadioBox = <K extends string | boolean>({
  id,
  className,
  isDisabled = false,
  iconName,
  value,
  label,
  description,
  ...rest
}: RadioBoxProps<K>) => {
  const isChecked = useRadioCheckState(value, false);
  const labelId = useId();
  const descriptionId = useId();

  return (
    <label
      key={`${value}`}
      className={classNames(styles.radioBox, className)}
      htmlFor={id}
      {...rest}
    >
      <RadioInput
        id={id}
        className={styles.radioInput}
        isChecked={isChecked}
        value={`${value}`}
        isDisabled={isDisabled}
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
          <div id={descriptionId} className={styles.description}>
            {description}
          </div>
        ) : null}
      </div>
    </label>
  );
};
