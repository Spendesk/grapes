import React, { MouseEventHandler, ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './DeprecatedPreview.module.scss';

export type DeprecatedPreviewProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Specifies the width of the element
   * @default parent
   */
  fit?: 'parent';
  /**
   * The text to display in the preview
   */
  primaryText: ReactNode;
  /**
   * The secondary text to display in the preview
   */
  secondaryText?: ReactNode;
  /**
   * Right addon of the preview
   */
  rightAddon?: ReactNode;
  /**
   * Handler that is called when the preview is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const DeprecatedPreview = ({
  className,
  primaryText,
  rightAddon,
  secondaryText,
  onClick,
  ...rest
}: DeprecatedPreviewProps) => {
  return (
    <button
      type="button"
      className={classNames(
        styles.preview,
        !!onClick && styles.clickablePreview,
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.previewContent}>
        <span className={styles.previewPrimaryText}>{primaryText}</span>
        {!!secondaryText && (
          <span className={styles.previewSecondaryText}>
            <span className={styles.previewSeparator}>|</span>
            {secondaryText}
          </span>
        )}
      </span>
      {!!rightAddon && (
        <span className={styles.previewRightAddon}>{rightAddon}</span>
      )}
    </button>
  );
};
