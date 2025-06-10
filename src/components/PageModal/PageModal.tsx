import React, { MouseEventHandler, ReactNode, useId } from 'react';
import { createPortal } from 'react-dom';
import { useTranslate } from '../../hooks/useTranslate';

import { IconButton } from '../IconButton';

import styles from './PageModal.module.css';
import { ModalOverlay } from '../Modal';

export type PageModalProps = {
  /**
   * The content of the PageModal.
   */
  children: ReactNode;
  /**
   * Whether the PageModal is open.
   */
  isOpen: boolean;
  /**
   * Remove the transition on the PageModal.
   * @default false
   */
  noAnimation?: boolean;
  /**
   * The element where to mount the Modal. It needs to be outside
   * the GrapesProvider tree for the focus trap to work properly.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * Close the PageModal.
   */
  onClose: MouseEventHandler<HTMLButtonElement>;
  /**
   * The title to display in the PageModal.
   */
  title: ReactNode;
};

export const PageModal = ({
  children,
  isOpen,
  noAnimation = false,
  portalContainer,
  onClose,
  title,
  ...rest
}: PageModalProps) => {
  const t = useTranslate();
  const titleId = useId();

  if (typeof document === 'undefined') {
    return null;
  }

  const pageModalContainer = (
    <ModalOverlay
      isOpen={isOpen}
      className={styles.pageModalOverlay}
      noAnimation={noAnimation}
    >
      <div
        className={styles.pageModalModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        {...rest}
      >
        <h2 id={titleId} className={styles.pageModalTitle}>
          {title}
          <IconButton
            iconName="cross"
            onClick={onClose}
            className={styles.pageModalExitButton}
            hasNegativeMargins
            aria-label={t('close')}
            variant="secondaryNeutral"
          />
        </h2>
        <div className={styles.pageModalContent}>{children}</div>
      </div>
    </ModalOverlay>
  );

  return createPortal(pageModalContainer, portalContainer ?? document.body);
};
