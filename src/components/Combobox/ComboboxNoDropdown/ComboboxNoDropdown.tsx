import React, { type HTMLProps } from 'react';
import { classNames } from '../../../utils';

import { useFormFieldContext } from '../../FormField/FormFieldContext';
import { Icon } from '../../Icon';
import { DropdownMenuContentList } from '../../DropdownMenuContent';
import { SkeletonText } from '../../Skeleton';
import type { ComboboxNoDropdownProps, ComboboxOption } from '../types';
import { colors } from '../../../colors';

import styles from './ComboboxNoDropdown.module.css';

export const ComboboxNoDropdown = <T extends ComboboxOption>(
  props: ComboboxNoDropdownProps<T>,
) => {
  const {
    className,
    dropdownMenuContentMaxHeight,
    fit = 'content',
    options,
    isDisabled = false,
    isInvalid,
    isInputVisible = true,
    isLoading = false,
    onClearSelection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hideToggleButton = false,
    renderSelected = () => null,
    renderOption,
    renderOptionGroup,
    renderNoOptions,
    renderLoadingOption = ({ key }: { key: string | number }) => (
      <SkeletonText key={key} size="xl" className={styles.loadingItem} />
    ),
    propsGetters: {
      getInputProps = () => ({}),
      getItemProps = () => ({}),
      getMenuProps = () => ({}),
    } = {},
    ...rest
  } = props;

  const context = useFormFieldContext();
  const isComboboxInvalid =
    isInvalid === undefined ? context.isInvalid : isInvalid;
  const inputProps: HTMLProps<HTMLInputElement> = {
    ...getInputProps(),
    'aria-invalid': isComboboxInvalid ? ('true' as const) : ('false' as const),
    ...(isComboboxInvalid && { ['aria-errormessage']: context.errorMessageId }),
    id: context.inputId,
  };

  return (
    <div className={styles.ComboboxNoDropdownContainer}>
      <div
        className={classNames(
          styles.inputContainer,
          fit === 'parent' && styles.parentFitCombobox,
          isDisabled && styles.disabledInputContainer,
        )}
      >
        <div
          className={classNames(
            styles.combobox,
            styles.parentFitCombobox,
            isDisabled && styles.disabledCombobox,
            isComboboxInvalid && styles.invalidCombobox,
            className,
          )}
          {...rest}
        >
          {renderSelected()}
          <input
            {...inputProps}
            className={classNames(
              styles.comboboxInput,
              !isInputVisible && styles.hideComboboxInput,
            )}
            onFocus={(event) => {
              return inputProps.onFocus?.(event);
            }}
            onBlur={(event) => {
              return inputProps.onBlur?.(event);
            }}
            disabled={isDisabled}
          />
          {onClearSelection && (
            <button
              type="button"
              className={styles.comboboxToggleButton}
              onClick={onClearSelection}
            >
              <Icon
                name="cross"
                color={colors.contentDecorativeIcon}
                size="s"
              />
            </button>
          )}
        </div>
      </div>

      <ul
        {...getMenuProps()}
        className={classNames(styles.list, className)}
        style={{ maxHeight: dropdownMenuContentMaxHeight ?? '152px' }}
        aria-busy={isLoading ? 'true' : 'false'}
      >
        <DropdownMenuContentList
          isLoading={isLoading}
          options={options}
          getItemProps={getItemProps}
          renderOption={renderOption}
          renderOptionGroup={renderOptionGroup}
          renderNoOptions={renderNoOptions}
          renderLoadingOptions={() => {
            const loadingOptionsCount =
              options.length === 0 ? 5 : options.length;

            return Array.from({ length: loadingOptionsCount }, (_, i) =>
              renderLoadingOption({ key: i }),
            );
          }}
        />
      </ul>
    </div>
  );
};
