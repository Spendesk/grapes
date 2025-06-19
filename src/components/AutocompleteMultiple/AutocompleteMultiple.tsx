import React, { useState, type ReactNode, type FocusEventHandler } from 'react';
import { useCombobox } from 'downshift';

import { DropdownItem } from '../DropdownItem';
import { CheckboxInput } from '../CheckboxInput';
import { Combobox } from '../Combobox';
import {
  ALL_KEY,
  isAllOption,
  getIsOptionSelected,
  type Option,
  type OptionGroup,
} from './option';

import styles from './AutocompleteMultiple.module.scss';
import { type Placement } from '../../utils';

const { stateChangeTypes: comboboxStateChangeTypes } = useCombobox;

export type AutocompleteMultipleProps<T extends Option> = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Maximum height of the dropdown menu.
   */
  dropdownMenuContentMaxHeight?: string;
  /**
   * Whether the AutocompleteMultiple should fit its parents or content.
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * Whether the AutocompleteMultiple is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the AutocompleteMultiple is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the AutocompleteMultiple is loading.
   */
  isLoading?: boolean;
  /**
   * The name of the Combobox, used when submitting an HTML form.
   */
  name?: string;
  /**
   * The current value.
   */
  values: T[];
  /**
   * The list of ComboBox options.
   */
  options: (T | OptionGroup<T>)[];
  /**
   * Temporary text that occupies the Combobox when it is empty.
   */
  placeholder?: string;
  /**
   * Whether the combobox should show a clear button.
   * @default false
   */
  showClearSelectionButton?: boolean;
  /**
   * Translations for the selected states of the AutocompleteMultiple.
   */
  translations: {
    selectAll?: string;
    selected: string;
  };
  /**
   * Handler that is called when the input changes.
   */
  onSearch(value: string | undefined): void | Promise<void>;
  /**
   * Handler that is called when a option is selected.
   */
  onSelect(values: T[]): void;
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Function to render option group.
   */
  renderOptionGroup?(optionGroup: OptionGroup<T>): ReactNode;
  /**
   * Function to render when no options are available
   */
  renderNoOptions?(rawValue: string): ReactNode;
  /**
   * Placement the menu will render relative to the field
   */
  placement?: Placement;
};

export const AutocompleteMultiple = <T extends Option>({
  className,
  isDisabled,
  isInvalid,
  isLoading,
  fit = 'content',
  name,
  values,
  options,
  placeholder,
  showClearSelectionButton = false,
  translations,
  onSearch,
  onSelect,
  onFocus,
  onBlur,
  renderNoOptions,
  renderOptionGroup,
  placement,
  ...rest
}: AutocompleteMultipleProps<T>) => {
  const withSelectAllOption = translations.selectAll;
  const allOption = { key: ALL_KEY, label: translations.selectAll } as T;
  const internalOptions = withSelectAllOption
    ? [allOption, ...options]
    : options;
  const keys = options
    .flatMap((option) => ('options' in option ? option.options : option))
    .map((option) => option.key);
  const internalSelectedOptions =
    values.length === keys.length &&
    keys.length > 0 &&
    values.every((value) => keys.includes(value.key))
      ? [allOption, ...values]
      : values;

  const [internalIsLoading, setInternalIsLoading] = useState(false);

  const addSelectedOption = (selectedItem: T) => {
    if (isAllOption(selectedItem)) {
      return internalOptions.flatMap((option) =>
        'options' in option ? option.options : option,
      );
    }
    const newSelectedOptions = [...internalSelectedOptions, selectedItem];
    return newSelectedOptions;
  };

  const removeSelectedOption = (selectedOption: T): T[] => {
    if (isAllOption(selectedOption)) {
      return [];
    }
    const newSelectedOptions = internalSelectedOptions.filter((item) => {
      return item.key !== selectedOption?.key && !isAllOption(item);
    });
    return newSelectedOptions;
  };

  const handleOnSelect = (selectedItem: T) => {
    const isOptionSelected = getIsOptionSelected(
      internalSelectedOptions,
      selectedItem,
    );
    const newSelectedOptions = isOptionSelected
      ? removeSelectedOption(selectedItem)
      : addSelectedOption(selectedItem);
    const optionsWithoutAll = newSelectedOptions.filter(
      (item) => !isAllOption(item),
    );
    onSelect(optionsWithoutAll);
  };

  const {
    isOpen,
    inputValue,
    openMenu,
    getMenuProps,
    getItemProps,
    getInputProps,
    getToggleButtonProps,
    setInputValue,
    reset,
  } = useCombobox({
    selectedItem: null,
    items: internalOptions.flatMap((option) =>
      'options' in option ? option.options : option,
    ),
    initialHighlightedIndex: -1,
    stateReducer: (state, { changes, type }) => {
      switch (type) {
        case comboboxStateChangeTypes.InputKeyDownEnter:
        case comboboxStateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            inputValue: state.inputValue,
            highlightedIndex: state.highlightedIndex,
          };
        case comboboxStateChangeTypes.FunctionReset:
          onSelect([]);
          return changes;
        default:
          return changes;
      }
    },
    itemToString: (option) => option?.label ?? '',
    onStateChange: async ({
      type,
      selectedItem,
      inputValue: newInputValue,
    }) => {
      switch (type) {
        case comboboxStateChangeTypes.ItemClick:
        case comboboxStateChangeTypes.InputKeyDownEnter:
          if (selectedItem) {
            handleOnSelect(selectedItem);
          }
          break;
        case comboboxStateChangeTypes.InputChange:
          setInternalIsLoading(true);
          try {
            await onSearch(newInputValue?.trim());
          } finally {
            setInternalIsLoading(false);
          }
          break;
        case comboboxStateChangeTypes.InputBlur: {
          setInputValue('');
          onSearch(undefined);
          break;
        }
        default:
      }
    },
  });

  const isInputVisible = internalSelectedOptions.length === 0 || isOpen;

  return (
    <Combobox
      className={className}
      fit={fit}
      onFocus={onFocus}
      onBlur={onBlur}
      options={internalOptions}
      isInputVisible={isInputVisible}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isLoading={isLoading || internalIsLoading}
      isMenuOpen={isOpen}
      renderSelected={() => {
        if (isInputVisible) {
          return null;
        }
        return (
          <button
            type="button"
            className={styles.autocompleteMultipleSelected}
            onClick={() => {
              openMenu();
            }}
          >
            {translations.selected}
          </button>
        );
      }}
      renderOption={(option) => {
        const isSelected = getIsOptionSelected(internalSelectedOptions, option);

        return (
          <DropdownItem
            key={option.key}
            label={option.label}
            isSelected={isSelected}
            // TODO: we shouldn't use the checkbox component only for visual clue (but a simple icon)
            prefix={
              <CheckboxInput isChecked={isSelected} onChange={() => {}} />
            }
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
        values.length !== 0 && showClearSelectionButton ? reset : undefined
      }
      placement={placement}
      {...rest}
    />
  );
};
