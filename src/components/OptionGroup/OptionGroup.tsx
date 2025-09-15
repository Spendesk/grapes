import React, { type ChangeEventHandler } from 'react';

import { classNames } from '../../utils';
import { useFormFieldContext } from '../FormField/FormFieldContext';
import { Icon, type IconName } from '../Icon';

import styles from './OptionGroup.module.css';
import commonStyles from '../../theme/placeholders/common.module.css';

type CommonProps<K extends string | boolean> = {
  /**
   * The name of the OptionGroup
   */
  name: string;
  /**
   * The current value
   */
  value: K | null;
  /**
   * Options contained within the OptionGroup
   * *
   * If the key iconName is provided then the associated icon will be displayed
   * instead of the label (and in this case the label will be used
   * as an accessible attribute to describe the icon)
   */
  options: { label: string; value: K; iconName?: IconName }[];
  /**
   * className for the element
   */
  className?: string;
  /**
   * Whether the OptionGroup is invalid.
   */
  isInvalid?: boolean;
};

/**
 * `onChange` props is required only if `isDisabled` is false
 * `isDisabled` props is optional (will default to false) if `onChange` is given
 */
type DisabledProps =
  | {
      /**
       * Handler that is called when the value changes.
       */
      onChange: ChangeEventHandler<HTMLInputElement>;
      /**
       * Whether the OptionGroup should be disabled.
       * @default false
       */
      isDisabled?: false;
    }
  | {
      onChange?: ChangeEventHandler<HTMLInputElement>;
      isDisabled: true;
    };

export type OptionGroupProps<K extends string | boolean = string> =
  CommonProps<K> & DisabledProps;

export const OptionGroup = <K extends string | boolean>({
  value,
  options,
  name,
  onChange,
  isDisabled = false,
  className,
  isInvalid,
  ...rest
}: OptionGroupProps<K>) => {
  const context = useFormFieldContext();

  const isInputInvalid =
    isInvalid === undefined ? context.isInvalid : isInvalid;

  const indexSelected = options.findIndex(
    (option) => `${option.value}` === `${value}`,
  );

  return (
    <div
      className={classNames(styles.optionGroup, className)}
      role="radiogroup"
      aria-disabled={isDisabled}
      aria-orientation="horizontal"
      aria-invalid={isInputInvalid ? ('true' as const) : ('false' as const)}
      aria-errormessage={isInputInvalid ? context.errorMessageId : undefined}
      style={{ ['--options' as string]: options.length }}
      aria-labelledby={context.labelId}
      aria-describedby={context.descriptionId}
      {...rest}
    >
      {isInputInvalid && <div className={styles.optionGroupInvalidBorder} />}
      {options.map((option) => {
        const isChecked = `${option.value}` === `${value}`;

        return (
          <label
            key={`${option.value}`}
            className={classNames(
              styles.optionGroupOption,
              isChecked && styles.selectedOptionGroupOption,
            )}
          >
            <input
              name={name}
              type="radio"
              className={commonStyles.visuallyHidden}
              checked={isChecked}
              value={`${option.value}`}
              disabled={isDisabled}
              onChange={onChange}
              aria-checked={isChecked ? 'true' : 'false'}
            />

            {option.iconName ? (
              <Icon
                className={styles.optionGroupOptionLabel}
                name={option.iconName}
                size="m"
                aria-label={option.label}
              />
            ) : (
              <span className={styles.optionGroupOptionLabel}>
                {option.label}
              </span>
            )}
          </label>
        );
      })}
      <Indicator index={indexSelected} />
    </div>
  );
};

type IndicatorProps = {
  index: number;
};
type IndicatorState = {
  transition?: string;
  display: string;
};
const Indicator = ({ index }: IndicatorProps) => {
  const [style, setStyle] = React.useState<IndicatorState>({
    transition: 'none',
    display: 'none',
  });

  React.useEffect(() => {
    if (index >= 0) {
      setStyle((state) => {
        const isFirstSelection = state.display === 'none';
        return {
          ...state,
          display: 'block',
          transition: isFirstSelection ? 'none' : undefined,
          ['--index' as string]: index,
        };
      });
    }
  }, [index]);

  return (
    <div
      role="presentation"
      className={styles.optionGroupIndicator}
      style={style}
    />
  );
};
