import React, {
  type ChangeEventHandler,
  type ClipboardEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type ReactNode,
  type Ref,
} from 'react';
import { classNames } from '../../utils';
import Cleave from 'cleave.js/react';
import type { CleaveOptions } from 'cleave.js/options';

import { useFormFieldContext } from '../FormField/FormFieldContext';

import styles from './Input.module.css';

export type InputVariant = 'default' | 'magicGradient';

export type InputProps = {
  ref?: Ref<HTMLInputElement>;
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Whether the Input should fit its parent or content.
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * The id of the Input.
   */
  id?: string;
  /**
   * The name of the Input, used when submitting an HTML form.
   */
  name?: string;
  /**
   * The type of the HTML input element.
   * @default text
   */
  type?: string;
  /**
   * The autocomplete value for the input element.
   */
  autoComplete?: string;
  /**
   * The interval between numbers in an input of type number.
   */
  step?: string;
  /**
   * The current value (controlled).
   */
  value?: string | number;
  /**
   * 	The default value (uncontrolled).
   */
  defaultValue?: string | number;
  /**
   * 	Temporary text that occupies the Input when it is empty.
   */
  placeholder?: string;
  /**
   * Whether the Input is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the Input should be read only.
   */
  isReadOnly?: boolean;
  /**
   * Whether the Input is disabled.
   */
  isDisabled?: boolean;
  /**
   * Left addon of the input.
   */
  leftAddon?: ReactNode;
  /**
   * Right addon of the input.
   */
  rightAddon?: ReactNode;
  /**
   * The maximum number of characters supported by the Input.
   */
  maxLength?: number;
  /**
   * @deprecated This props will be removed in a near futur
   */
  maskOptions?: CleaveOptions;
  /**
   * Specifies how the text is aligned.
   * @default left
   */
  textAlign?: 'left' | 'right' | 'center';
  /**
   * The visual style of the input
   * @default default
   */
  variant?: InputVariant;
  /**
   * Minimum value in a number input.
   */
  min?: number;
  /**
   * Maximum value in a number input.
   */
  max?: number;
  /**
   * Type of data that might be entered, to display the appropriate virtual
   * keyboard.
   */
  inputMode?: 'decimal' | 'numeric';
  /**
   * Regular expression that the input's value must match in order for the value to pass
   */
  pattern?: string;
  /**
   * Handler that is called when the value changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the user copies text.
   */
  onCopy?: ClipboardEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the user pastes text.
   */
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when a key is pressed.
   */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the mouse is rolled over the element.
   */
  onWheel?: React.WheelEventHandler<HTMLInputElement>;
};

export const Input = ({
  className,
  fit = 'content',
  type = 'text',
  id,
  isInvalid,
  isReadOnly,
  isDisabled,
  leftAddon,
  rightAddon,
  maskOptions,
  textAlign = 'left',
  variant = 'default',
  onChange,
  onFocus,
  onBlur,
  onCopy,
  onKeyDown,
  onWheel,
  ref,
  ...rest
}: InputProps) => {
  const context = useFormFieldContext();

  const isInputInvalid =
    isInvalid === undefined ? context.isInvalid : isInvalid;
  const shouldFitParent = context.fit !== undefined || fit === 'parent';
  const inputProps = {
    className: styles.input,
    id: id ?? context.inputId,
    type,
    readOnly: isReadOnly,
    disabled: isDisabled,
    style: {
      textAlign,
    },
    onChange,
    onFocus,
    onBlur,
    onCopy,
    onKeyDown,
    onWheel,
    'aria-describedby': context.descriptionId,
    'aria-invalid': isInputInvalid ? ('true' as const) : ('false' as const),
    ...(isInputInvalid && { ['aria-errormessage']: context.errorMessageId }),
    ...rest,
  };

  return (
    <div
      data-variant={variant}
      className={classNames(
        styles.inputContainer,
        isInputInvalid && variant === 'default' && styles.invalidInputContainer,
        shouldFitParent && styles.parentFitInputContainer,
        className,
      )}
    >
      {leftAddon && <div className={styles.leftAddon}>{leftAddon}</div>}
      {maskOptions ? (
        <Cleave
          {...inputProps}
          key={JSON.stringify(maskOptions)}
          options={maskOptions}
        />
      ) : (
        <input {...inputProps} ref={ref} />
      )}
      {rightAddon && <div className={styles.rightAddon}>{rightAddon}</div>}
    </div>
  );
};
