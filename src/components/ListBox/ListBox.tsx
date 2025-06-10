import React, { ReactNode, useRef } from 'react';
import { classNames } from '../../utils';

import { ListBoxGroup } from './ListBoxGroup';
import { getEnabledOptionIds, groupByFn } from './utils';
import { ListBoxProvider } from './ListBoxProvider';
import { ListBoxFooter } from './ListBoxFooter';
import { ListBoxHeader } from './ListBoxHeader';
import { EmptyListBox } from './EmptyListBox';
import { Options } from './Options';

import styles from './ListBox.module.scss';

export type OptionVariant = 'alert' | 'warning' | undefined;

export type ListBoxProps<T extends object> = {
  /**
   * Options in the collection.
   */
  options: T[];
  /**
   * Render function for each option.
   * @param option Option to render.
   * @param titleId Unique identifer that labels the checkbox.
   */
  children: (option: T, titleId: string) => ReactNode;
  /**
   * Get unique identifer for a given option.
   * @param option Option from which to retrieve the identifer.
   */
  getOptionId: (option: T) => string;
  /**
   * Get whether a given option should be disabled.
   * By default, all options are enabled.
   */
  getIsOptionDisabled?: (option: T) => boolean;
  /**
   * Get whether a given option should be active.
   * By default, all options are not active.
   */
  getIsOptionActive?: (option: T) => boolean;
  /**
   * Get whether a given option should be checkable.
   * By default, all options can be checked.
   */
  getIsOptionCheckable?: (option: T) => boolean;
  /**
   * Handler that is called when an option is clicked
   */
  onOptionClick?: (option: T) => void;
  /**
   * Get the visual style of the option
   */
  getOptionVariant?: (option: T) => OptionVariant;
  /**
   * Header of the listbox
   */
  header?: ReactNode;
  /**
   * Footer of the listbox
   */
  footer?: ReactNode;
  /**
   * Defined the look of the list when no option are provided.
   */
  emptyState?: {
    title: string;
    subtitle?: ReactNode;
  };
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The size of the options.
   * @default normal
   */
  rowHeight?: 'normal' | 'compact';
} & SelectListProps<T> &
  GroupedListProps<T>;

type SelectListProps<T> =
  | {
      /**
       * Handler that is called when an option state changes.
       * @param option Option associated to the changed checkbox.
       * @param optionId Option's unique identifier.
       * @param isSelected Whether the option is checked.
       */
      onOptionChange: (option: T, optionId: string, isChecked: boolean) => void;
      /**
       * Handler that is called when the top checkbox state changes.
       * @param options Options associated to the changed checkboxes
       * @param optionIds Option's unique identifiers
       * @param isSelected Whether the options are checked
       */
      onAllOptionsChange: (
        options: T[],
        optionIds: string[],
        isChecked: boolean,
      ) => void;
      /**
       * The current checked unique identifiers in the collection.
       */
      checkedOptionIds: string[];
    }
  | {
      onOptionChange?: never;
      onAllOptionsChange?: never;
      checkedOptionIds?: never;
    };

type GroupedListProps<T> =
  | {
      /**
       * Function to group options together.
       */
      groupBy: (option: T) => string;
      /**
       * Render function for grouped option
       */
      renderGroupedOptionsHeader: (
        value: string,
        aggregatedOptions: T[],
      ) => ReactNode;
    }
  | {
      groupBy?: never;
      renderGroupedOptionsHeader?: never;
    };

/**
 * A list of options that can allow selection of one or more.
 */
export function ListBox<T extends object>({
  className,
  options,
  rowHeight = 'normal',
  children,
  getOptionId,
  onOptionClick,
  getIsOptionActive,
  getIsOptionCheckable,
  groupBy,
  header,
  footer,
  renderGroupedOptionsHeader,
  checkedOptionIds,
  onOptionChange,
  onAllOptionsChange,
  getIsOptionDisabled,
  emptyState,
  getOptionVariant,
  ...rest
}: ListBoxProps<T>) {
  const listBoxRef = useRef<HTMLUListElement>(null);
  const groupedData = groupByFn(options, groupBy);
  const optionIds = getEnabledOptionIds(
    options,
    getOptionId,
    getIsOptionDisabled,
    getIsOptionCheckable,
  );
  const hasCheckbox = !!onOptionChange;

  const handleAllOptionsChange = (isChecked: boolean) => {
    if (onAllOptionsChange) {
      onAllOptionsChange(options, optionIds, isChecked);
    }
  };

  if (options.length < 1 && emptyState) {
    return (
      <EmptyListBox title={emptyState.title} className={className} {...rest}>
        {emptyState.subtitle}
      </EmptyListBox>
    );
  }

  return (
    <ul
      ref={listBoxRef}
      role="listbox"
      className={classNames(styles.list, className)}
      aria-multiselectable={hasCheckbox}
      {...rest}
    >
      <ListBoxProvider
        listBoxRef={listBoxRef}
        rowHeight={rowHeight}
        onOptionClick={onOptionClick}
        getOptionId={getOptionId}
        getIsOptionDisabled={getIsOptionDisabled}
        getIsOptionCheckable={getIsOptionCheckable}
        onOptionChange={onOptionChange}
        renderOption={children}
        renderGroupedOptionsHeader={renderGroupedOptionsHeader}
        checkedOptionIds={checkedOptionIds}
        optionIds={optionIds}
        options={options}
        getIsOptionActive={getIsOptionActive}
        getOptionVariant={getOptionVariant}
      >
        <ListBoxHeader onAllOptionsChange={handleAllOptionsChange}>
          {header}
        </ListBoxHeader>
        {groupBy ? (
          Object.entries(groupedData).map(
            ([key, aggregatedOptions]: [string, T[]]) => (
              <ListBoxGroup
                key={key}
                groupValue={key}
                options={aggregatedOptions}
              >
                <Options options={aggregatedOptions} />
              </ListBoxGroup>
            ),
          )
        ) : (
          <Options options={options} />
        )}
        <ListBoxFooter>{footer}</ListBoxFooter>
      </ListBoxProvider>
    </ul>
  );
}
