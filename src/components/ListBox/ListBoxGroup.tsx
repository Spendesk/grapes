import React, { ReactNode } from 'react';
import { useId } from '../../hooks/useId';

import styles from './ListBox.module.scss';
import { useGroupedOptionContext } from './ListBoxProvider';

export type ListBoxGroup<T extends object> = {
  options: T[];
  groupValue: string;
  children: ReactNode;
};

export function ListBoxGroup<T extends object>({
  groupValue,
  options,
  children,
}: ListBoxGroup<T>) {
  const id = useId();
  const { renderGroupedOptionsHeader } = useGroupedOptionContext();

  return (
    <li role="presentation" className={styles.group}>
      <div className={styles.groupHeader} aria-hidden="true" id={id}>
        {renderGroupedOptionsHeader(groupValue, options)}
      </div>
      <ul role="group" aria-labelledby={id} className={styles.subList}>
        {children}
      </ul>
    </li>
  );
}
