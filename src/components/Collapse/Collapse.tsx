import React from 'react';
import { classNames } from '../../utils';

import styles from './Collapse.module.css';

export type CollapseProps = {
  open?: boolean;
  children: React.ReactNode;
  className?: string;
  renderHeader: () => React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
  name?: string;
  noAnimation?: boolean;
};

export const Collapse = ({
  name,
  open = true,
  children,
  className,
  renderHeader,
  onToggle,
  noAnimation,
}: CollapseProps) => {
  return (
    <details
      name={name}
      className={classNames(styles.details, className)}
      open={open}
      data-motion-reduced={noAnimation}
      onToggle={(e) => {
        const target = e.target as HTMLDetailsElement;
        if (onToggle) {
          onToggle(target.open);
        }
      }}
    >
      <summary className={styles.summary}>{renderHeader()}</summary>
      <div>{children}</div>
    </details>
  );
};
