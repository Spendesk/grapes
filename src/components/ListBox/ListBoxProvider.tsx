import React, { type ReactNode } from 'react';
import type { OptionVariant } from './ListBox';
import { type DirectionKey, getIndexFromDirectionKey } from './utils';

type Context<T extends object> = {
  listBoxRef: React.RefObject<HTMLUListElement | null>;
  options: T[];
  rowHeight: 'normal' | 'compact';
  renderOption: (option: T, titleId: string) => ReactNode;
  getOptionId: (option: T) => string;
  onOptionClick?: (option: T) => void;
  checkedOptionIds?: string[];
  onOptionChange?: (option: T, id: string, isSelected: boolean) => void;
  renderGroupedOptionsHeader?: (value: string, options: T[]) => ReactNode;
  optionIds: string[];
  getIsOptionDisabled?: (option: T) => boolean;
  getIsOptionActive?: (option: T) => boolean;
  getIsOptionCheckable?: (option: T) => boolean;
  getOptionVariant?: (option: T) => OptionVariant;
};

// TODO: any ?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListBoxContext = React.createContext<Context<any> | null>(null);

export type ListBoxProviderProps<T extends object> = {
  children: ReactNode;
} & Context<T>;

export function ListBoxProvider<T extends object>({
  children,
  ...contextProps
}: ListBoxProviderProps<T>) {
  return (
    <ListBoxContext.Provider value={contextProps}>
      {children}
    </ListBoxContext.Provider>
  );
}

export function useOptionContext<T extends object>(option: T) {
  const context = React.useContext<Context<T> | null>(ListBoxContext);
  if (context === null) {
    throw new Error('useOptionContext should be within a ListBoxContext');
  }

  const {
    renderOption,
    onOptionClick,
    getIsOptionActive,
    getOptionId,
    onOptionChange,
    checkedOptionIds = [],
    getIsOptionDisabled,
    getIsOptionCheckable,
    getOptionVariant,
    optionIds,
    options,
    listBoxRef,
    rowHeight,
  } = context;

  const id = getOptionId(option);
  const isDisabled = getIsOptionDisabled ? getIsOptionDisabled(option) : false;
  const isCheckboxDisabled = getIsOptionCheckable
    ? !getIsOptionCheckable(option)
    : false;
  const variant = getOptionVariant ? getOptionVariant(option) : undefined;

  const handleKeyboardNavigation = React.useCallback(
    (directionKey: DirectionKey) => {
      const currentIndex = optionIds.indexOf(id);
      const maxIndex = optionIds.length - 1;

      const newIndex = getIndexFromDirectionKey(
        currentIndex,
        directionKey,
        maxIndex,
      );

      const newId = optionIds[newIndex];
      const newOption = options.find((option) => getOptionId(option) === newId);

      if (newOption) {
        onOptionClick?.(newOption);
      }
    },
    [optionIds, id, onOptionClick, options, getOptionId],
  );

  const isActiveElementInsideListBox = React.useCallback(() => {
    return (
      listBoxRef.current && listBoxRef.current.contains(document.activeElement)
    );
  }, [listBoxRef]);

  return {
    renderOption,
    onOptionClick,
    rowHeight,
    active: getIsOptionActive ? getIsOptionActive(option) : false,
    isChecked: checkedOptionIds.includes(id),
    id,
    isDisabled,
    isCheckboxDisabled,
    onOptionChange,
    variant,
    handleKeyboardNavigation,
    isActiveElementInsideListBox,
  };
}

export function useGroupedOptionContext() {
  const context = React.useContext(ListBoxContext);
  if (context === null || !context.renderGroupedOptionsHeader) {
    throw new Error(
      'useGroupedOptionContext should be within a ListBoxContext',
    );
  }
  return { renderGroupedOptionsHeader: context.renderGroupedOptionsHeader };
}

export function useOptionHeaderContext() {
  const context = React.useContext(ListBoxContext);
  if (context === null) {
    throw new Error('useOptionHeaderContext should be within a ListBoxContext');
  }

  const { checkedOptionIds, optionIds } = context;

  if (checkedOptionIds) {
    const isDisabled = optionIds.length === 0;
    const isChecked =
      !isDisabled && optionIds.every((id) => checkedOptionIds?.includes(id));
    const isIndeterminate = !isChecked && checkedOptionIds.length > 0;

    return {
      isChecked,
      isDisabled,
      isIndeterminate,
      hasCheckbox: true,
    };
  }
  return {
    isChecked: false,
    isDisabled: false,
    isIndeterminate: false,
    hasCheckbox: false,
  };
}

export function useGetOptionId() {
  const context = React.useContext(ListBoxContext);
  if (context === null) {
    throw new Error('useGetOptionId should be within a ListBoxContext');
  }

  return context.getOptionId;
}
