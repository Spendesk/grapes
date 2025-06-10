import React, { forwardRef } from 'react';

import { Input, type InputProps } from '../Input';

export type TextInputProps = Omit<InputProps, 'type'>;

/**
 * A text field is an input that allows a user to write or edit text.
 * @see https://grapes.spendesk.design/docs/components/text-input
 */
export const TextInput = /*@__PURE__*/ forwardRef<
  HTMLInputElement,
  TextInputProps
>(
  (
    {
      className,
      fit = 'content',
      textAlign = 'left',
      variant = 'default',
      ...rest
    }: TextInputProps,
    ref,
  ) => {
    return (
      <Input
        {...rest}
        className={className}
        ref={ref}
        fit={fit}
        type="text"
        textAlign={textAlign}
        variant={variant}
      />
    );
  },
);
