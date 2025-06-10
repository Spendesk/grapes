import React, { FocusEventHandler, ReactNode } from 'react';

import { DropdownItem } from '../../DropdownItem';
import {
  Combobox,
  type ComboboxProps,
  type ComboboxOption,
  ComboboxOptionGroup,
} from '../../Combobox';
import { useAutocompleteCombobox } from '../hooks';
import { type Placement } from '../../../utils';

import styles from './Autocomplete.module.scss';

export type AutocompleteProps<T extends ComboboxOption> = Omit<
  ComboboxProps<T>,
  | 'isOpen'
  | 'propsGetters'
  | 'renderSelected'
  | 'renderNoOptions'
  | 'renderOption'
  | 'onClearSelection'
> & {
  /**
   * Temporary text that occupies the Combobox when it is empty.
   */
  placeholder?: string;
  /**
   * The name of the Combobox, used when submitting an HTML form.
   */
  name?: string;
  /**
   * The list of ComboBox options.
   */
  options: (T | ComboboxOptionGroup<T>)[];
  /**
   * The current value.
   */
  value: T | undefined;
  /**
   * Whether the combobox should show a clear button.
   * @default false
   */
  showClearSelectionButton?: boolean;
  /**
   * Internal props, do not use.
   * @default false
   */
  isAutocompletePlace?: boolean;
  /**
   * Handler that is called when a option is selected.
   */
  onSelect(option: T | undefined): void;
  /**
   * Handler that is called when the input changes.
   */
  onSearch(search: string | undefined): void;
  /**
   * Function to render the selected options.
   * Act like a leftAddon for the underneath input.
   */
  renderPrefix?(option: T | null): ReactNode;
  /**
   * Function to render option.
   */
  renderOption?(option: T, state?: { isSelected: boolean }): ReactNode;
  /**
   * Function to render option group.
   */
  renderOptionGroup?(optionGroup: ComboboxOptionGroup<T>): ReactNode;
  /**
   * Function to render when no options are available
   */
  renderNoOptions?(rawValue: string): ReactNode;
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
};

export const Autocomplete = <T extends ComboboxOption>({
  name,
  placeholder,
  value,
  options,
  isLoading,
  showClearSelectionButton = false,
  isAutocompletePlace = false,
  placement,
  renderPrefix,
  onSelect,
  onSearch,
  renderOption,
  renderNoOptions,
  renderOptionGroup,
  onBlur,
  onFocus,
  ...comboboxProps
}: AutocompleteProps<T>) => {
  const internalOptions =
    options.length === 0 && value && !isAutocompletePlace ? [value] : options;

  const {
    isOpen,
    inputValue,
    selectedItem,
    isLoading: internalIsLoading,
    getMenuProps,
    getItemProps,
    getInputProps,
    getToggleButtonProps,
    reset,
  } = useAutocompleteCombobox({
    options: internalOptions,
    value,
    onSelect,
    onSearch,
    isLoading,
  });

  return (
    <Combobox<T>
      {...comboboxProps}
      {...(comboboxProps.variant !== 'noDropdown'
        ? { isMenuOpen: isOpen }
        : {})}
      onBlur={onBlur}
      onFocus={onFocus}
      isLoading={internalIsLoading}
      options={internalOptions}
      placement={placement}
      hideToggleButton={isAutocompletePlace}
      renderSelected={() =>
        renderPrefix?.(selectedItem) ? (
          <div className={styles.autocompleteSelectedPrefix}>
            {renderPrefix(selectedItem)}
          </div>
        ) : null
      }
      renderOption={(option) => {
        const isSelected = value?.key === option.key;

        return renderOption ? (
          renderOption(option, { isSelected })
        ) : (
          <DropdownItem
            key={option.key}
            label={option.label}
            isSelected={isSelected}
          />
        );
      }}
      renderOptionGroup={renderOptionGroup}
      renderNoOptions={() =>
        renderNoOptions ? renderNoOptions(inputValue) : null
      }
      propsGetters={{
        getInputProps: () =>
          getInputProps({
            name,
            placeholder,
          }),
        getToggleButtonProps,
        getItemProps,
        getMenuProps,
      }}
      onClearSelection={
        showClearSelectionButton && inputValue !== '' ? reset : undefined
      }
    />
  );
};
