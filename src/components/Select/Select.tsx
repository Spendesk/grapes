import React, { type FocusEventHandler, type ReactNode } from 'react';
import { useCombobox } from 'downshift';
import { classNames, type Placement } from '../../utils';

import { Combobox } from '../Combobox';
import { DropdownItem } from '../DropdownItem';
import type { Option, OptionGroup } from './option';

import styles from './Select.module.css';

export type SelectProps<T extends Option> = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Maximum height of the dropdown content.
   */
  dropdownContentMaxHeight?: string;
  /**
   * Whether the Select should fit its parent or content.
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * Whether the Select is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the Select is invalid.
   */
  isInvalid?: boolean;
  /**
   * The name of the Select, used when submitting an HTML form.
   */
  name?: string;
  /**
   * The list of options.
   */
  options: (T | OptionGroup<T>)[];
  /**
   * 	Temporary text that occupies the Select when it is empty.
   */
  placeholder?: string;
  /**
   * The current value (controlled).
   */
  value: T | undefined;
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Placement the menu will render relative to the field
   */
  placement?: Placement;
  /**
   * Handler that is called when a option is selected.
   */
  onSelect(value: T): void;
  /**
   * Function to render option. Should return DropdownItem(s).
   */
  renderOption?(
    option: T,
    state?: {
      isSelected: boolean;
      isDisabled: boolean;
    },
  ): ReactNode;
  /**
   * Function to render option group.
   */
  renderOptionGroup?(optionGroup: OptionGroup<T>): ReactNode;
};

export const Select = <T extends Option>({
  className,
  dropdownContentMaxHeight,
  fit = 'content',
  isDisabled,
  isInvalid,
  name,
  options,
  placeholder,
  value,
  onBlur,
  onFocus,
  onSelect,
  renderOption,
  renderOptionGroup,
  placement,
  ...rest
}: SelectProps<T>) => {
  const {
    isOpen,
    getInputProps,
    getItemProps,
    getMenuProps,
    getToggleButtonProps,
  } = useCombobox({
    items: options.flatMap((option) =>
      'options' in option ? option.options : option,
    ),
    // We use `null` instead of `undefined` because this component relies on Downshift which also manages its own internal state. We want to override Downshift's internal state to use value from props instead. In order to do so, we need to give values that are not `undefined` (cf docs: https://github.com/downshift-js/downshift#control-props)
    initialSelectedItem: value ?? null,
    selectedItem: value ?? null,
    initialHighlightedIndex: -1,
    itemToString: (option) => option?.label ?? '',
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        onSelect(newSelectedItem);
      }
    },
    isItemDisabled: (item) => item?.disabled === true,
  });

  return (
    <Combobox
      className={classNames(styles.select, className)}
      dropdownMenuContentMaxHeight={dropdownContentMaxHeight}
      fit={fit}
      onBlur={onBlur}
      onFocus={onFocus}
      options={options}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isMenuOpen={isOpen}
      renderOption={(option) => {
        const isSelected = value?.key === option.key;
        const isDisabled = option.disabled ?? false;

        if (renderOption) {
          return renderOption(option, {
            isSelected,
            isDisabled,
          });
        }
        return (
          <DropdownItem
            key={option.key}
            label={option.label}
            isSelected={isSelected}
          />
        );
      }}
      renderOptionGroup={renderOptionGroup}
      propsGetters={{
        getInputProps: () =>
          getInputProps({
            name,
            placeholder,
            readOnly: true,
          }),
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
      }}
      placement={placement}
      {...rest}
    />
  );
};
