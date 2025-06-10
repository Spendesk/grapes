import React, { ReactElement, ReactNode } from 'react';

import styles from './Modal.module.css';

export type ModalHeaderWithIllustrationProps = {
  /**
   * 	The title of the Modal
   */
  title: string;
  /**
   * The Subtitle of the Modal
   */
  subtitle?: string;
  /**
   * The illustration to display
   */
  illustration: ReactNode;
  /**
   * Specifies the illustration height.
   * @default 424px
   */
  illustrationHeight?: string;
  /**
   * The title's unique identifier. Same identifier should be pass to ModalContent using aria-labelledby.
   */
  titleId?: string;
};

export const ModalHeaderWithIllustration = ({
  illustration,
  illustrationHeight = '424px',
  title,
  subtitle,
  titleId,
}: ModalHeaderWithIllustrationProps): ReactElement | null => {
  return (
    <>
      <div
        className={styles.modalIllustration}
        style={{ height: illustrationHeight }}
      >
        {illustration}
      </div>
      <h1 className={styles.modalIllustrationTitle} id={titleId}>
        {title}
      </h1>
      {subtitle && <p className={styles.modalSubtitle}>{subtitle}</p>}
    </>
  );
};
