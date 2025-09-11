import React, { type ReactNode } from 'react';

import { Icon } from '../Icon';
import { Label } from '../Label';

import styles from './FormField.module.css';
import { FormFieldProvider } from './FormFieldContext';
import { useId } from '../../hooks/useId';

export type FormFieldProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * The content to display in the FormField
   */
  children: ReactNode;
  /**
   * Content to render as additionnal information
   * on the right side of the label
   */
  hint?: ReactNode;
  /**
   * The id of the element which is associated with the control.
   * Use only to break the automatic link between the label and the input
   */
  htmlFor?: string;
  /**
   * The content to display in the tooltip near the label
   */
  infoTipContent?: ReactNode;
  /**
   * The text to display as the label.
   */
  label: string;
  /**
   * 	A description for the field. Provide a hint message to guide user.
   */
  description?: string;
  /**
   * The text to display as alert message.
   * If provided, the FormField will act as a React Context provider so
   * that any descendant Grapes `<Input />` can automatically apply `isInvalid` & `aria-invalid`
   */
  alertMessage?: string;
  /**
   * The text to display as warn message.
   */
  warningMessage?: string;
  /**
   * Whether the label should be visually hidden
   * @default false
   */
  visuallyHideLabel?: boolean;
};

/**
 * Component to enrich a Grapes input.
 * @see https://grapes.spendesk.design/docs/components/form-field
 */
export const FormField = ({
  className,
  children,
  hint,
  htmlFor,
  infoTipContent,
  label,
  description,
  alertMessage,
  warningMessage,
  visuallyHideLabel = false,
  ...rest
}: FormFieldProps) => {
  const message = extractMessageByPriority(alertMessage, warningMessage);
  const errorMessageId = useId();
  const labelId = useId();
  const inputId = useId();
  const descriptionId = useId();
  const isInvalid = message?.severity === 'alert';

  const renderMessage = () => {
    if (!message) {
      return null;
    }
    return (
      <output
        htmlFor={inputId}
        data-severity={message.severity}
        className={styles.formFieldMessage}
        aria-labelledby={errorMessageId}
      >
        <Icon
          name={
            message.severity === 'alert' ? 'hexagone-cross' : 'triangle-warning'
          }
          aria-hidden="true"
        />
        <span id={errorMessageId}>{message.text}</span>
      </output>
    );
  };

  return (
    <FormFieldProvider
      isInvalid={isInvalid}
      errorMessageId={message ? errorMessageId : undefined}
      labelId={labelId}
      inputId={inputId}
      descriptionId={description ? descriptionId : undefined}
    >
      <div className={className} {...rest}>
        <Label
          fit="parent"
          hint={hint}
          htmlFor={htmlFor ?? inputId}
          infoTipContent={infoTipContent}
          label={label}
          id={labelId}
          visuallyHideLabel={visuallyHideLabel}
        />
        {description ? (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        ) : null}
        {children}
        {renderMessage()}
      </div>
    </FormFieldProvider>
  );
};

const extractMessageByPriority = (
  alertMessage?: string,
  warningMessage?: string,
): { severity: 'alert' | 'warning'; text: string } | undefined => {
  if (alertMessage) {
    return {
      severity: 'alert',
      text: alertMessage,
    };
  }
  if (warningMessage) {
    return {
      severity: 'warning',
      text: warningMessage,
    };
  }
  return undefined;
};
