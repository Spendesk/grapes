import React, { type HTMLProps, type ReactNode, Fragment } from 'react';

import { DropdownItem } from '../DropdownItem';

import styles from './DropdownMenuContentList.module.scss';

type Option = { key: string; label: string };

type OptionGroup<T> = { key: string; label: string; options: T[] };

export type Props<T extends Option> = {
  isLoading?: boolean;
  options: (T | OptionGroup<T>)[];
  getItemProps(options: { item: T; index: number }): HTMLProps<HTMLLIElement>;
  renderOption(option: T, index: number): ReactNode; // should always return a DropdownItem component
  renderOptionGroup?(optionGroup: OptionGroup<T>): ReactNode;
  renderNoOptions?(): ReactNode;
  renderLoadingOptions?(): ReactNode;
};

export const DropdownMenuContentList = <T extends Option>({
  isLoading = false,
  options,
  getItemProps,
  renderOption,
  renderOptionGroup = (optionGroup) => (
    <DropdownItem
      key={optionGroup.key}
      label={optionGroup.label}
      className={styles.dropdownItemGroup}
    />
  ),
  renderNoOptions,
  renderLoadingOptions,
}: Props<T>) => {
  const internalRenderOption = (option: T, index: number) => {
    const itemProps = getItemProps({ index, item: option });
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
      <li
        {...itemProps}
        key={option.key}
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (itemProps.onClick) {
            itemProps.onClick(e);
          }
        }}
      >
        {renderOption(option, index)}
      </li>
    );
  };

  let optionIndex = -1;
  return (
    <>
      {!isLoading &&
        options.length > 0 &&
        options.map((option) => {
          if ('options' in option) {
            if (!option.options.length) {
              return null;
            }

            return (
              <Fragment key={option.key}>
                {renderOptionGroup?.(option)}
                {option.options.map((option) => {
                  optionIndex += 1;
                  return internalRenderOption(option, optionIndex);
                })}
              </Fragment>
            );
          }

          optionIndex += 1;
          return internalRenderOption(option, optionIndex);
        })}
      {!isLoading && options.length === 0 && renderNoOptions?.()}
      {isLoading && renderLoadingOptions?.()}
    </>
  );
};
