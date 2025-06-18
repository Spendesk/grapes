import React from 'react';

import { Autocomplete, type Props as AutocompleteProps } from '../Autocomplete';
import { Popover, type PopoverProps } from '../Popover';
import type { ComboboxOption } from '../Combobox';

export type DropdownMenuSearchProps<T extends ComboboxOption> = Omit<
  PopoverProps,
  'children'
> &
  AutocompleteProps<T> & {
    /**
     * Whether the dropdown should stay open when an option is selected.
     */
    keepOpenOnSelect?: boolean;
  };

export const DropdownMenuSearch = <T extends ComboboxOption>({
  className,
  keepOpenOnSelect,
  renderTrigger,
  onSelect,
  ...rest
}: DropdownMenuSearchProps<T>) => {
  return (
    <Popover className={className} renderTrigger={renderTrigger}>
      {(onClose) => {
        const dropdownOnSelect = keepOpenOnSelect
          ? onSelect
          : (option?: T) => {
              onClose();
              onSelect(option);
            };

        return (
          <Autocomplete
            {...rest}
            onSelect={dropdownOnSelect}
            variant="noDropdown"
            showClearSelectionButton
          />
        );
      }}
    </Popover>
  );
};
