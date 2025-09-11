import React, { useEffect, useRef } from 'react';
import { useId } from '../../hooks/useId';
import { CheckboxInput } from '../CheckboxInput';

import styles from './ListBox.module.css';
import { useOptionContext } from './ListBoxProvider';
import { classNames } from '../../utils';

export type OptionProps<T extends object> = {
  option: T;
};

const stopPropagation = (
  e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
) => {
  e.stopPropagation();
};

export function Option<T extends object>({ option }: OptionProps<T>) {
  const {
    renderOption,
    onOptionClick,
    rowHeight,
    active,
    id,
    isChecked,
    onOptionChange,
    isDisabled,
    isCheckboxDisabled,
    variant,
    handleKeyboardNavigation,
    isActiveElementInsideListBox,
  } = useOptionContext(option);
  const titleId = useId();
  const controlId = useId();
  const optionReference = useRef<null | HTMLLIElement>(null);

  const handleClick = () => {
    if (!isDisabled) {
      onOptionClick?.(option);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Home':
      case 'End':
        return handleKeyboardNavigation(e.key);
    }
  };

  useEffect(() => {
    if (active && isActiveElementInsideListBox()) {
      optionReference.current?.focus();
    }
  }, [active, isActiveElementInsideListBox]);

  return (
    <li
      ref={optionReference}
      className={classNames(
        styles.item,
        onOptionClick && styles.clickableItem,
        rowHeight === 'compact' && styles.compactItem,
      )}
      role="option"
      tabIndex={active ? 0 : -1}
      onClick={handleClick}
      onKeyDown={onOptionClick && handleKeyDown}
      aria-selected={active ? 'true' : 'false'}
      aria-labelledby={titleId}
      aria-disabled={isDisabled}
      data-variant={variant}
    >
      {onOptionChange ? (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <label
          className={styles.targetZone}
          htmlFor={controlId}
          onClick={stopPropagation}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              // Stop Space event propagation to avoid conflict with option listener
              stopPropagation(e);
            }
          }}
        >
          <CheckboxInput
            id={controlId}
            aria-labelledby={titleId}
            isChecked={isChecked}
            isDisabled={isDisabled || isCheckboxDisabled}
            onChange={(e) => {
              onOptionChange(option, id, e.currentTarget.checked);
            }}
          />
        </label>
      ) : null}
      {renderOption(option, titleId)}
    </li>
  );
}
