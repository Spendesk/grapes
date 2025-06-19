import React, {
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';
import { classNames } from '../../utils';

import { IconButton } from '../IconButton';

import styles from './Modal.module.css';
import { useTranslate } from '../../hooks/useTranslate';

export type ModalContentProps = {
  /**
   * The content of the Modal
   */
  children: ReactNode;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Handler that is called when the Modal is closed.
   * If not provided, the Close button won't be displayed
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

export const ModalContent = ({
  children,
  className,
  onClose,
  ...rest
}: ModalContentProps): ReactElement | null => {
  const t = useTranslate();
  return (
    <div
      className={classNames(styles.modal, className)}
      role="dialog"
      aria-modal="true"
      {...rest}
    >
      {onClose && (
        <IconButton
          className={styles.modalCloseButton}
          iconName="cross"
          onClick={onClose}
          aria-label={t('close')}
        />
      )}
      {children}
    </div>
  );
};
