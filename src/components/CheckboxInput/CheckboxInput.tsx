import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';
import { classNames } from '../../utils';

import { Icon, IconName } from '../Icon';

import styles from './CheckboxInput.module.scss';

export type CheckboxInputProps = Readonly<{
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The id of the CheckboxInput.
   */
  id?: string;
  /**
   * The name of the CheckboxInput, used when submitting an HTML form.
   */
  name?: string;
  /**
   * Whether the CheckboxInput is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the checkbox is indeterminate.
   * @default false
   */
  isIndeterminate?: boolean;
  /**
   * Whether the checkbox is checked.
   */
  isChecked: boolean;
  /**
   * The current value (controlled).
   */
  value?: string;
  /**
   * Handler that is called when the value changes.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the input is clicked.
   */
  onClick?: MouseEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when a key is pressed.
   */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}>;

export const CheckboxInput = ({
  className,
  id,
  name,
  isDisabled = false,
  isIndeterminate = false,
  isChecked,
  value,
  onChange,
  onClick,
  ...rest
}: CheckboxInputProps) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // indeterminate is a property, but it can only be set via javascript
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#indeterminate_state_checkboxes
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  let iconName: IconName | null = null;
  let status: 'false' | 'true' | 'mixed' = 'false';
  if (isIndeterminate) {
    iconName = 'minus';
    status = 'mixed';
  } else if (isChecked) {
    iconName = 'check';
    status = 'true';
  }

  return (
    <span className={classNames(styles.checkbox, className)}>
      <input
        ref={checkboxRef}
        name={name}
        id={id}
        type="checkbox"
        className={styles.checkboxInput}
        onChange={onChange}
        checked={isChecked}
        value={value}
        aria-checked={status}
        disabled={isDisabled}
        onClick={(event) => onClick?.(event)}
        {...rest}
      />
      {iconName !== null && (
        <Icon
          className={styles.checkboxIcon}
          name={iconName}
          aria-hidden="true"
        />
      )}
    </span>
  );
};
