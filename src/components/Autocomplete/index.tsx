import React from 'react';

import {
  Autocomplete as BaseAutocomplete,
  AutocompleteProps,
} from './Autocomplete';
import {
  AutocompleteWithAddOption,
  AutocompleteWithAddOptionProps,
} from './AutocompleteWithAddOption';
import { Option } from './option';

export type Props<T extends Option> =
  | AutocompleteWithAddOptionProps<T>
  | (AutocompleteProps<T> & {
      renderAddOption?: never;
    });

export const Autocomplete = <T extends Option>(props: Props<T>) => {
  return props.renderAddOption ? (
    <AutocompleteWithAddOption {...props} />
  ) : (
    <BaseAutocomplete {...props} />
  );
};
