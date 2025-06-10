import { SortState, TableColumn } from './types';

export function getEnabledRowIds<T>(
  rows: T[],
  getRowId: (row: T) => string,
  getIsRowDisabled?: (row: T) => boolean,
  getIsRowCheckable?: (row: T) => boolean,
) {
  return rows.reduce((enabledRows, row) => {
    if (
      (getIsRowDisabled && getIsRowDisabled(row)) ||
      (getIsRowCheckable && !getIsRowCheckable(row))
    ) {
      return enabledRows;
    }
    enabledRows.push(getRowId(row));
    return enabledRows;
  }, [] as string[]);
}

export function tableSortFunction<T extends object>(
  data: T[],
  { columnId, direction }: SortState,
  columns: TableColumn<T>[],
  Collator: Intl.Collator,
) {
  if (direction === 'none' || !columnId) {
    return data;
  }

  const getSortValue = columns.find(({ id }) => id === columnId)?.getSortValue;

  if (!getSortValue) {
    return data;
  }

  const clonedList = [...data];

  return clonedList.sort((a, b) => {
    const valueA = getSortValue(a);
    const valueB = getSortValue(b);

    const multiplicator = direction === 'ascending' ? 1 : -1;

    if (valueA === null || valueA === undefined) {
      return -1 * multiplicator;
    }
    if (valueB === null || valueB === undefined) {
      return 1 * multiplicator;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return Collator.compare(valueA, valueB) * multiplicator;
    }

    if (valueA < valueB) {
      return -1 * multiplicator;
    }
    if (valueA > valueB) {
      return 1 * multiplicator;
    }
    return 0;
  });
}
