import React, { ReactNode, useRef } from 'react';
import { useSelect } from 'downshift';
import { classNames } from '../../utils';

import { DropdownItem } from '../DropdownItem';
import { Icon } from '../Icon';
import { DropdownMenuContent } from '../DropdownMenuContent';

import styles from './SelectAddon.module.scss';

const { stateChangeTypes } = useSelect;

export type SelectAddonOptionGroup<T> = {
  key: string;
  label: string;
  options: T[];
};

export type SelectAddonOption = { key: string; label: string };

export type Props<T extends SelectAddonOption> = {
  className?: string;
  options: (T | SelectAddonOptionGroup<T>)[];
  value: T | undefined;
  isDisabled?: boolean;
  position?: 'left' | 'right';
  onSelect(value: T): void;
  optionToString?(option: SelectAddonOption | null): string;
  renderOption?(option: T, state?: { isSelected: boolean }): ReactNode; // should always return a DropdownItem component
  renderOptionGroup?(optionGroup: SelectAddonOptionGroup<T>): ReactNode;
  renderSelectedItem(value: T): React.ReactNode;
} & Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'value' | 'onSelect'>;

export const SelectAddon = <T extends SelectAddonOption>({
  className,
  options,
  value,
  isDisabled = false,
  position = 'right',
  onSelect,
  optionToString = (option) => option?.label ?? '',
  renderOption,
  renderOptionGroup,
  renderSelectedItem,
  ...rest
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { isOpen, getToggleButtonProps, getMenuProps, getItemProps } =
    useSelect({
      items: options.flatMap((option) =>
        'options' in option ? option.options : option,
      ),
      itemToString: optionToString,
      selectedItem: value ?? null,
      onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
        if (newSelectedItem) {
          onSelect(newSelectedItem);
        }
      },
      onStateChange: ({ type }) => {
        switch (type) {
          case stateChangeTypes.ItemClick:
          case stateChangeTypes.ToggleButtonKeyDownEnter:
            if (inputRef.current) {
              inputRef.current.blur();
            }
            break;
          default:
        }
      },
    });

  return (
    <>
      <div
        className={classNames(
          styles.selectAddon,
          position === 'right' && styles.rightSelectAddon,
          position === 'left' && styles.leftSelectAddon,
          isOpen && styles.openSelectAddon,
          className,
        )}
      >
        <button
          {...getToggleButtonProps({
            'aria-label': rest['aria-label'],
            'aria-controls': isOpen ? getMenuProps().id : undefined,
            ...rest,
          })}
          type="button"
          className={styles.selectAddonToggleButton}
          disabled={isDisabled}
        >
          {value && renderSelectedItem(value)}
          <Icon
            className={classNames(
              styles.selectAddonCaret,
              isDisabled && styles.disabledSelectAddonCaret,
            )}
            name="chevron-down"
            size="s"
            aria-hidden="true"
          />
        </button>
      </div>
      <DropdownMenuContent
        isOpen={isOpen}
        options={options}
        className={styles.selectAddonDropdownMenu}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        renderOption={(option) => {
          const isSelected = value?.key === option.key;
          if (renderOption) {
            return renderOption(option, { isSelected });
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
    </>
  );
};
