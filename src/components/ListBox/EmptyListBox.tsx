import React, { ReactNode } from 'react';
import { useId } from '../../hooks/useId';
import styles from './ListBox.module.scss';
import { classNames } from '../../utils';

export type EmptyListBoxProps = {
  title: string;
  children?: ReactNode;
  className?: string;
};

export function EmptyListBox({
  title,
  children,
  className,
  ...rest
}: EmptyListBoxProps) {
  const descriptionId = useId();

  return (
    <ul
      role="listbox"
      className={classNames(styles.list, className)}
      aria-describedby={descriptionId}
      {...rest}
    >
      <li role="presentation" className={styles.emptyBody}>
        <div className={styles.emptyTitle} id={descriptionId}>
          {title}
        </div>
        <div>{children}</div>
      </li>
    </ul>
  );
}
