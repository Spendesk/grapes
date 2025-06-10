import React from 'react';

import { classNames } from '../../utils';
import { CheckboxInput } from '../CheckboxInput';
import { useTableRowCheckboxContext } from './TableProvider';

import styles from './Table.module.scss';
import { useId } from '../../hooks/useId';

type Props<T extends object> = {
  row: T;
};

const stopPropagation = (
  e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
) => {
  e.stopPropagation();
};

export function TableRowCheckbox<T extends object>({ row }: Props<T>) {
  const controlId = useId();
  const { isChecked, isDisabled, isCheckboxDisabled, onChange } =
    useTableRowCheckboxContext(row);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <label
      aria-label={isChecked ? 'Unselect' : 'Select'}
      htmlFor={controlId}
      onClick={stopPropagation}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          // Stop Space event propagation to avoid conflict with option listener
          stopPropagation(e);
        }
      }}
      className={classNames(styles.tableCellWrapper, styles.tableCheckboxLabel)}
    >
      <CheckboxInput
        id={controlId}
        isChecked={isChecked}
        isDisabled={isDisabled || isCheckboxDisabled}
        onClick={(event) => {
          // prevent triggering onRowClick
          event.stopPropagation();
        }}
        onChange={onChange}
      />
    </label>
  );
}
