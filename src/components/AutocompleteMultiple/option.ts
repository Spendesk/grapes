import type { DropdownItemProps } from '../DropdownItem';

export type OptionGroup<T> = { key: string; label: string; options: T[] };

export type Option = {
  key: string;
  label: string;
  props?: Omit<DropdownItemProps, 'label'>;
};

export const ALL_KEY = 'all';

export const isAllOption = (option: Option | null | undefined): boolean => {
  return option?.key === ALL_KEY;
};

export const getIsOptionSelected = <T extends Option>(
  selectedOptions: T[],
  option: T,
): boolean => {
  return selectedOptions.some(({ key }) => key === option.key);
};
