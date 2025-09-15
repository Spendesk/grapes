import React from 'react';

import { CheckboxInput } from '../CheckboxInput';
import { classNames } from '../../utils';
import { useTableHeaderCheckboxContext } from './TableProvider';

import styles from './Table.module.css';

export const TableHeaderCheckbox = () => {
  const context = useTableHeaderCheckboxContext();
  const { isChecked, isDisabled, isIndeterminate, onChange } = context;

  return (
    <div
      className={classNames(
        styles.tableCellWrapper,
        styles.tableCheckboxLabelHeader,
      )}
    >
      <CheckboxInput
        id="table-select-all"
        aria-label={isChecked ? 'Unselect all' : 'Select all'}
        isChecked={isChecked}
        isDisabled={isDisabled}
        isIndeterminate={isIndeterminate}
        onChange={onChange}
      />
    </div>
  );
};
