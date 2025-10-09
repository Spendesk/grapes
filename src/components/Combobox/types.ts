import type { FocusEventHandler, HTMLProps, ReactNode } from 'react';
import type { Placement } from '../../utils';
import type {
  GetInputPropsReturnValue,
  GetItemPropsReturnValue,
  GetMenuPropsReturnValue,
} from 'downshift';

export type ComboboxOptionGroup<T> = {
  key: string;
  label: string;
  options: T[];
};

export type ComboboxOption = { key: string; label: string };

export type PropsGetters<T> = {
  getInputProps(): GetInputPropsReturnValue;
  getToggleButtonProps(): HTMLProps<HTMLButtonElement>;
  getItemProps(options: { item: T; index: number }): GetItemPropsReturnValue;
  getMenuProps(): GetMenuPropsReturnValue;
};

export type BaseComboboxProps<T extends ComboboxOption> = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Maximum height of the dropdown menu.
   */
  dropdownMenuContentMaxHeight?: string;
  /**
   * Whether the Combobox should fit its parents or content.
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * The visual style of the Combobox
   */
  inputVariant?: 'default' | 'magicGradient';
  /**
   * The list of ComboBox options.
   */
  options: (T | ComboboxOptionGroup<T>)[];
  /**
   * Whether the Combobox is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the Combobox is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the input should be displayed.
   */
  isInputVisible?: boolean;
  /**
   * Whether the Combobox is loading.
   */
  isLoading?: boolean;
  /**
   * Function to render the search bar inside the dropdown header.
   * Provides Downshift's getInputProps so the header input supports
   * keyboard navigation (arrow keys, enter, etc.).
   */
  renderSearchBar?: (args: {
    getInputProps: PropsGetters<T>['getInputProps'];
  }) => ReactNode;

  onClearSelection?(): void;
  /**
   * Function to render the input.
   */
  renderInput?(inputProps: HTMLProps<HTMLInputElement>): ReactNode;
  renderSelected?(): ReactNode;
  renderOption(option: T, index: number): ReactNode;
  renderOptionGroup?(optionGroup: ComboboxOptionGroup<T>): ReactNode;
  renderNoOptions?(): ReactNode;
  /**
   * Function to render options in a loading state.
   */
  renderLoadingOption?({ key }: { key: string | number }): ReactNode;
  propsGetters: PropsGetters<T>;
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export type ComboboxWithDropdownProps<T extends ComboboxOption> =
  BaseComboboxProps<T> & {
    isMenuOpen?: boolean;
    placement?: Placement;
    hideToggleButton?: boolean;
  };

export type ComboboxNoDropdownProps<T extends ComboboxOption> =
  BaseComboboxProps<T> & {
    hideToggleButton?: boolean;
  };

export type Variant = 'withDropdown' | 'noDropdown';
