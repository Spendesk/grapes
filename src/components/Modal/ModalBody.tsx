import React, { ReactElement, ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './Modal.module.css';

export type ModalBodyProps = {
  /**
   * The modal's main content.
   */
  children?: ReactNode;
  /**
   * className for the element
   */
  className?: string;
};

export const ModalBody = ({
  children,
  className,
  ...rest
}: ModalBodyProps): ReactElement | null => {
  return (
    <div className={classNames(styles.modalBody, className)} {...rest}>
      {children}
    </div>
  );
};
