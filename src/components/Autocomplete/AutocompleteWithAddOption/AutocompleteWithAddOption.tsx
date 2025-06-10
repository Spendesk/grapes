import React, { ReactChild } from 'react';

import { DropdownItem } from '../../DropdownItem';
import { Combobox } from '../../Combobox';
import { AutocompleteProps } from '../Autocomplete';
import { Option } from '../option';
import { useAutocompleteCombobox } from '../hooks';

import styles from './AutocompleteWithAddOption.module.scss';

export const addOptionItemKey = 'add-option-item';

export type Props<T extends Option> = AutocompleteProps<T> & {
  /**
   * Function to render the add option item. It should always return a DropdownItem component.
   */
  renderAddOption(rawValue: string): ReactChild;
  /**
   * Handler that is called when an option has been added.
   */
  onAddOption(newOptionLabel: string): T | Promise<T>;
};

export const AutocompleteWithAddOption = <T extends Option>({
  name,
  value,
  options,
  placeholder,
  isLoading,
  showClearSelectionButton = false,
  renderPrefix,
  renderOption,
  renderOptionGroup,
  renderAddOption,
  renderNoOptions,
  onAddOption,
  onSearch,
  onSelect,
  ...comboboxProps
}: Props<T>) => {
  let internalOptions =
    options.length === 0 && value
      ? [value, { key: addOptionItemKey, label: '' } as T]
      : [...options, { key: addOptionItemKey, label: '' } as T];

  const {
    isOpen,
    inputValue,
    selectedItem,
    isLoading: internalIsLoading,
    getMenuProps,
    getItemProps,
    getInputProps,
    getToggleButtonProps,
    selectItem,
    reset,
  } = useAutocompleteCombobox({
    options: internalOptions,
    value,
    isLoading,
    onSelect,
    onSearch,
    onSelectedItemChange: async ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem?.key === addOptionItemKey) {
        const newOption = await onAddOption(inputValue);
        onSelect(newOption);
        selectItem(newOption);
      } else {
        onSelect(newSelectedItem ?? undefined);
      }
    },
  });

  // Remove 'Add option' item if the input search is empty
  if (inputValue.trim().length === 0) {
    internalOptions = internalOptions.filter(
      (option) => option.key !== addOptionItemKey,
    );
  }

  return (
    <Combobox
      {...comboboxProps}
      {...(comboboxProps.variant !== 'noDropdown'
        ? { isMenuOpen: isOpen }
        : {})}
      options={internalOptions}
      isLoading={internalIsLoading}
      renderSelected={() =>
        renderPrefix?.(selectedItem) ? (
          <div className={styles.autocompleteSelectedPrefix}>
            {renderPrefix(selectedItem)}
          </div>
        ) : null
      }
      renderOption={(option) => {
        const isSelected = value?.key === option.key;

        if (option.key === addOptionItemKey) {
          const hasInputValue = !!inputValue;
          const doesOptionAlreadyExist = internalOptions.some(
            (option) =>
              option.label.toLowerCase() === inputValue.toLowerCase().trim(),
          );
          const shouldShowAddOptionItem =
            hasInputValue && !doesOptionAlreadyExist;

          return shouldShowAddOptionItem && renderAddOption(inputValue);
        }

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
        getItemProps: ({ index, item }) => getItemProps({ index, item }),
        getMenuProps,
      }}
      onClearSelection={
        selectedItem && showClearSelectionButton ? reset : undefined
      }
    />
  );
};
