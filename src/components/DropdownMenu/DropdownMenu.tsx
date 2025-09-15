import React, { type ReactNode } from 'react';
import Downshift, { type GetToggleButtonPropsOptions } from 'downshift';
import { classNames, type Placement } from '../../utils';

import { DropdownMenuContent } from '../DropdownMenuContent';
import { DropdownItem } from '../DropdownItem';

import styles from './DropdownMenu.module.css';

type OptionGroup<T> = { key: string; label: string; options: T[] };

type Option = { key: string; label: string };

export interface ToggleButtonProps
  extends Omit<GetToggleButtonPropsOptions, 'ref' | 'aria-hidden'> {
  isDropdown: boolean;
}

export type DropdownMenuProps<T extends Option> = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Maximum height of the dropdown content.
   */
  dropdownContentMaxHeight?: string;
  /**
   * The list of options in the menu.
   */
  options: (T | OptionGroup<T>)[];
  /**
   * Placement the menu will render relative to the field.
   * @default bottom-start
   */
  placement?: Placement;
  /**
   * Whether the dropdown should stay open when an option is selected.
   * @default false
   */
  keepOpenOnSelect?: boolean;
  /**
   * Handler that is called when a option is selected.
   */
  onSelect?(option: T): void;
  /**
   * Function to render the button.
   */
  renderButton(
    getToggleButtonProps: (
      options?: GetToggleButtonPropsOptions,
    ) => ToggleButtonProps,
    isDropdownOpened: boolean,
  ): ReactNode;
  /**
   * Function to render option. Should return DropdownItem(s).
   */
  renderOption?(
    option: T,
    index: number,
    state?: { isSelected: boolean },
  ): ReactNode;
  /**
   * Function to render option group.
   */
  renderOptionGroup?(optionGroup: OptionGroup<T>): ReactNode;
};

export const DropdownMenu = <T extends Option>({
  className,
  dropdownContentMaxHeight,
  options,
  placement = 'bottom-start',
  keepOpenOnSelect = false,
  onSelect,
  renderButton,
  renderOption,
  renderOptionGroup,
  ...rest
}: DropdownMenuProps<T>) => {
  return (
    <div className={classNames(styles.dropdownMenu, className)} {...rest}>
      <Downshift
        itemToString={(option) => (option ? option.label : null)}
        onSelect={(option) => {
          if (onSelect && option) {
            onSelect(option);
          }
        }}
        stateReducer={(state, changes) => {
          switch (changes.type) {
            case Downshift.stateChangeTypes.clickItem:
              return {
                ...changes,
                isOpen: keepOpenOnSelect,
              };
            case Downshift.stateChangeTypes.blurButton:
              return {
                ...changes,
                isOpen: state.isOpen, // Do not change Menu state on blur - Fix flakiness on test.
              };
            default:
              return changes;
          }
        }}
      >
        {({
          getItemProps,
          getMenuProps,
          getRootProps,
          getToggleButtonProps,
          isOpen,
          selectedItem,
        }) => {
          return (
            <div {...getRootProps({}, { suppressRefError: true })}>
              {renderButton(
                (options) => ({
                  ...getToggleButtonProps(options),
                  isDropdown: true,
                }),
                isOpen,
              )}
              <DropdownMenuContent
                placement={placement}
                maxHeight={dropdownContentMaxHeight ?? '271px'}
                isOpen={isOpen}
                options={options}
                getItemProps={getItemProps}
                getMenuProps={getMenuProps}
                renderOption={(option, index) => {
                  const isSelected = selectedItem?.key === option.key;
                  if (renderOption) {
                    return renderOption(option, index, {
                      isSelected,
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
              />
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};
