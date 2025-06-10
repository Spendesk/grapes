import React, { ReactNode } from 'react';
import { CheckboxInput } from '../CheckboxInput';

import styles from './ListBox.module.scss';
import { useOptionHeaderContext } from './ListBoxProvider';
import { useId } from '../../hooks/useId';
import { classNames } from '../../utils';

export type ListBoxHeaderProps = {
  children: ReactNode;
  onAllOptionsChange: (isChecked: boolean) => void;
};

export function ListBoxHeader({
  children,
  onAllOptionsChange,
}: ListBoxHeaderProps) {
  const context = useOptionHeaderContext();
  const controlId = useId();
  if (!children) {
    return null;
  }

  const { isChecked, isDisabled, isIndeterminate, hasCheckbox } = context;

  return (
    <li
      role="presentation"
      className={classNames(styles.item, styles.headerItem)}
    >
      {hasCheckbox ? (
        <label className={styles.targetZone} htmlFor={controlId}>
          <CheckboxInput
            id={controlId}
            isDisabled={isDisabled}
            isChecked={isChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => {
              onAllOptionsChange(e.currentTarget.checked);
            }}
            aria-label={isChecked ? 'Unselect all' : 'Select all'}
          />
        </label>
      ) : null}
      {children}
    </li>
  );
}
