import React, { type ReactElement, type ReactNode } from 'react';

import styles from './Modal.module.css';

export type ModalFooterProps = {
  /**
   * The modal actions
   */
  children?: ReactNode;
};

export const ModalFooter = ({
  children,
}: ModalFooterProps): ReactElement | null => {
  return <div className={styles.modalActions}>{children}</div>;
};
