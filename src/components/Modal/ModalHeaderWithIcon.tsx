import React, { ReactElement } from 'react';

import { HighlightIcon, type HighlightIconVariant } from '../HighlightIcon';
import type { IconName } from '../Icon/Icon';

import styles from './Modal.module.css';

export type ModalHeaderWithIconVariant = HighlightIconVariant;
export type ModalHeaderWithIconProps = {
  /**
   * 	The title of the Modal
   */
  title: string;
  /**
   * The Subtitle of the Modal
   */
  subtitle?: string;
  /**
   * The icon to display
   */
  iconName: IconName;
  /**
   * Specifies the icon variant
   * @default info
   */
  iconVariant?: ModalHeaderWithIconVariant;
  /**
   * The title's unique identifier. Same identifier should be pass to ModalContent using aria-labelledby.
   */
  titleId?: string;
};

export const ModalHeaderWithIcon = ({
  iconName,
  iconVariant = 'info',
  title,
  subtitle,
  titleId,
}: ModalHeaderWithIconProps): ReactElement | null => {
  return (
    <>
      <div className={styles.modalHeaderWithIcon}>
        <HighlightIcon
          size={56}
          name={iconName}
          variant={iconVariant}
          aria-hidden={true}
        />
      </div>
      <h1 className={styles.modalTitle} id={titleId}>
        {title}
      </h1>
      {subtitle && <p className={styles.modalSubtitle}>{subtitle}</p>}
    </>
  );
};
