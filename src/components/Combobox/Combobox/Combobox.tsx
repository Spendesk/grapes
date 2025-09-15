import React from 'react';
import { classNames } from '../../../utils';

import { useFormFieldContext } from '../../FormField/FormFieldContext';
import { DropdownMenuContent } from '../../DropdownMenuContent';
import { SkeletonText } from '../../Skeleton';
import { Icon } from '../../Icon';
import type { ComboboxWithDropdownProps, ComboboxOption } from '../types';
import { colors } from '../../../colors';

import { useTranslate } from '../../../hooks/useTranslate';

import styles from './Combobox.module.css';
import commonStyles from '../../../theme/common.module.css';

export const Combobox = <T extends ComboboxOption>(
  props: ComboboxWithDropdownProps<T>,
) => {
  const {
    className,
    dropdownMenuContentMaxHeight,
    fit = 'content',
    options,
    isDisabled = false,
    isInvalid,
    isInputVisible = true,
    isMenuOpen = false,
    isLoading = false,
    inputVariant = 'default',
    hideToggleButton = false,
    onClearSelection,
    renderSelected = () => null,
    onFocus,
    onBlur,
    renderOption,
    renderOptionGroup,
    renderNoOptions,
    renderLoadingOption = ({ key }: { key: string | number }) => (
      <SkeletonText key={key} size="xl" className={styles.loadingItem} />
    ),
    propsGetters: {
      getInputProps,
      getToggleButtonProps,
      getItemProps,
      getMenuProps,
    },
    placement,
    ...rest
  } = props;
  const t = useTranslate();

  const context = useFormFieldContext();
  const isComboboxInvalid =
    isInvalid === undefined ? context.isInvalid : isInvalid;
  const inputProps = {
    ...getInputProps(),
    'aria-invalid': isComboboxInvalid ? ('true' as const) : ('false' as const),
    ...(isComboboxInvalid && { ['aria-errormessage']: context.errorMessageId }),
    id: context.inputId,
    'aria-describedby': context.descriptionId,
    'aria-labelledby': undefined, // unset aria-labelledby provided by downshift
    onBlur,
    onFocus,
  };

  return (
    <div
      className={classNames(
        styles.comboboxWrapper,
        fit === 'parent' && styles.parentFitCombobox,
      )}
    >
      <div
        data-variant={inputVariant}
        className={classNames(
          styles.combobox,
          isComboboxInvalid && styles.invalidCombobox,
          fit === 'parent' && styles.parentFitCombobox,
          className,
        )}
        {...rest}
      >
        <div className={styles.comboboxInputContainer}>
          {renderSelected()}
          <input
            {...inputProps}
            className={classNames(
              styles.comboboxInput,
              commonStyles.ellipsis,
              !isInputVisible && styles.hideComboboxInput,
            )}
            disabled={isDisabled}
          />
        </div>
        {onClearSelection ? (
          <button
            type="button"
            className={styles.comboboxToggleButton}
            onClick={() => {
              onClearSelection();
            }}
            aria-label={t('clearSelection')}
          >
            <Icon
              name="cross"
              color={colors.contentDecorativeIcon}
              size="s"
              aria-hidden
            />
          </button>
        ) : (
          !hideToggleButton && (
            <button
              {...getToggleButtonProps()}
              type="button"
              className={styles.comboboxToggleButton}
              aria-label={t('showOptions')}
            >
              <Icon
                name="chevron-down"
                color={colors.contentDecorativeIcon}
                aria-hidden="true"
              />
            </button>
          )
        )}
      </div>
      <DropdownMenuContent
        isOpen={isMenuOpen}
        isLoading={isLoading}
        maxHeight={dropdownMenuContentMaxHeight ?? '152px'}
        options={options}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        renderOption={renderOption}
        renderOptionGroup={renderOptionGroup}
        renderNoOptions={renderNoOptions}
        placement={placement}
        renderLoadingOptions={() => {
          const loadingOptionsCount = options.length === 0 ? 5 : options.length;

          return Array.from({ length: loadingOptionsCount }, (_, i) =>
            renderLoadingOption({ key: i }),
          );
        }}
      />
    </div>
  );
};
