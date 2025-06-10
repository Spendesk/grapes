import { useEffect, useState } from 'react';
import { useCombobox, UseComboboxProps } from 'downshift';

import usePrevious from '../../../hooks/usePrevious';
import { ComboboxOption, ComboboxOptionGroup } from '../../Combobox';

const { stateChangeTypes } = useCombobox;

export type Props<T extends ComboboxOption> = {
  options: (T | ComboboxOptionGroup<T>)[];
  value: T | undefined;
  isLoading?: boolean;
  onSelect(option: T | undefined): void;
  onSearch(search: string | undefined): void;
} & Partial<UseComboboxProps<T>>;

export const useAutocompleteCombobox = <T extends ComboboxOption>({
  options,
  value,
  isLoading = false,
  onSearch,
  onSelect,
  ...useComboboxOverride
}: Props<T>) => {
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const previousValue = usePrevious(value);

  const { inputValue, setInputValue, selectItem, reset, ...rest } = useCombobox(
    {
      items: options.flatMap((option) =>
        'options' in option ? option.options : option,
      ),
      // We use `null` instead of `undefined` because this component relies on Downshift which also manages its own internal state. We want to override Downshift's internal state to use value from props instead. In order to do so, we need to give values that are not `undefined` (cf docs: https://github.com/downshift-js/downshift#control-props)
      initialSelectedItem: value ?? null,
      initialHighlightedIndex: -1,
      stateReducer: (_, { changes, type }) => {
        switch (type) {
          case stateChangeTypes.InputChange:
            return {
              ...changes,
              selectedItem: undefined,
            };
          default:
            return changes;
        }
      },
      itemToString: (option) => option?.label ?? '',
      onInputValueChange: async ({ type, inputValue: newInputValue }) => {
        if (type === stateChangeTypes.InputChange) {
          setInternalIsLoading(true);
          try {
            await onSearch(newInputValue?.trim());
          } finally {
            setInternalIsLoading(false);
          }
        } else {
          onSearch(undefined);
        }
      },
      onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
        onSelect(newSelectedItem ?? undefined);
      },
      onStateChange: ({ type, selectedItem: newSelectedItem }) => {
        switch (type) {
          case stateChangeTypes.InputBlur: {
            if (!newSelectedItem && value && inputValue) {
              selectItem(value);
            } else if (!newSelectedItem && !value) {
              setInputValue('');
            } else if (!newSelectedItem) {
              onSelect(undefined);
            }
            break;
          }
          default:
        }
      },
      ...useComboboxOverride,
    },
  );

  useEffect(() => {
    if (previousValue?.key !== value?.key) {
      if (value) {
        selectItem(value);
      } else {
        reset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    inputValue,
    setInputValue,
    selectItem,
    isLoading: internalIsLoading || isLoading,
    reset,
    ...rest,
  };
};
