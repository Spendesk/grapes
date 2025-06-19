import React, {
  forwardRef,
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { classNames } from '../../utils';

import { useFormFieldContext } from '../FormField/FormFieldContext';

import styles from './TextArea.module.css';

export type TextAreaProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * The id of the TextArea
   */
  id?: string;
  /**
   * Whether the TextArea should be read only.
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * Whether the TextArea is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the TextArea is invalid.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * The name of the TextArea, used when submitting an HTML form
   */
  name?: string;
  /**
   * Temporary text that occupies the TextArea when it is empty.
   */
  placeholder?: string;
  /**
   * The number of visible text lines for the control.
   * @default 3
   */
  rows?: number;
  /**
   * The current value (controlled).
   */
  value: string;
  /**
   * Handler that is called when the value changes.
   */
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  /**
   * Handler that is called when a key is pressed.
   */
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  /**
   * The maximum number of characters supported by the TextArea.
   */
  maxLength?: number;
};

export const TextArea = /*@__PURE__*/ forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(
  (
    {
      className,
      id,
      isDisabled,
      isInvalid,
      isReadOnly,
      name,
      placeholder,
      rows = 3,
      value,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    }: TextAreaProps,
    ref,
  ) => {
    const context = useFormFieldContext();

    const isTextAreaInvalid =
      isInvalid === undefined ? context.isInvalid : isInvalid;

    return (
      <textarea
        className={classNames(styles.textArea, className)}
        id={id ?? context.inputId}
        ref={ref}
        disabled={isDisabled}
        readOnly={isReadOnly}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        aria-describedby={context.descriptionId}
        aria-invalid={
          isTextAreaInvalid ? ('true' as const) : ('false' as const)
        }
        aria-errormessage={
          isTextAreaInvalid ? context.errorMessageId : undefined
        }
        aria-multiline="true"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...rest}
      />
    );
  },
);
