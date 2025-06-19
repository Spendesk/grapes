import React, { type ChangeEventHandler, type ReactElement } from 'react';
import { classNames } from '../../utils';

import type { RadioFieldProps } from '../RadioField';
import { useFormFieldContext } from '../FormField/FormFieldContext';

import styles from './RadioGroup.module.css';

export type RadioGroupProps = Readonly<{
  /**
   * The name of the RadioGroup
   */
  name: string;
  /**
   * The current value
   */
  value: string | null;
  /**
   * The RadioInput(s) contained within the RadioGroup.
   */
  children: ReactElement<RadioFieldProps> | ReactElement<RadioFieldProps>[];
  /**
   * Handler that is called when the value changes.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * The axis the RadioInput(s) should align with.
   * @default row
   */
  direction?: 'row' | 'column';
  /**
   * className for the element
   */
  className?: string;
}>;

type Context = {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | null;
};

export const RadioGroupContext = React.createContext<Context | null>(null);

/**
 * Handles a set of RadioField or RadioBox where no more than one of these component
 * can be checked at a time.
 */
export const RadioGroup = ({
  name,
  className,
  value,
  children,
  onChange,
  direction = 'row',
  ...rest
}: RadioGroupProps) => {
  const context = useFormFieldContext();
  const isDirectionColumn = direction === 'column';

  return (
    <div
      {...rest}
      role="radiogroup"
      className={classNames(styles.radioGroup, className)}
      aria-orientation={isDirectionColumn ? 'vertical' : 'horizontal'}
      aria-labelledby={context.labelId}
    >
      <RadioGroupContext.Provider
        value={{
          name,
          value,
          onChange,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};
