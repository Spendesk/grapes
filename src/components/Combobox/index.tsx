import React from 'react';

import { Combobox as DefaultCombobox } from './Combobox';
import { ComboboxNoDropdown } from './ComboboxNoDropdown';
import { BaseComboboxProps, ComboboxOption, Variant } from './types';

import { type Placement } from '../../utils';
export type { ComboboxOption, ComboboxOptionGroup } from './types';

export type ComboboxProps<T extends ComboboxOption> = BaseComboboxProps<T> &
  (
    | {
        /**
         * The visual style of the Autocomplete.
         */
        variant?: Extract<Variant, 'withDropdown'>;
        isMenuOpen?: boolean;
        placement?: Placement;
        hideToggleButton?: boolean;
      }
    | {
        variant: Extract<Variant, 'noDropdown'>;
      }
  );

export const Combobox = <T extends ComboboxOption>({
  variant,
  ...comboBoxProps
}: ComboboxProps<T>) => {
  return variant === 'noDropdown' ? (
    <ComboboxNoDropdown {...comboBoxProps} />
  ) : (
    <DefaultCombobox {...comboBoxProps} />
  );
};
