import React, { type MouseEventHandler, type ReactNode } from 'react';

import { useId } from '../../hooks/useId';
import { classNames } from '../../utils';
import { IconButton } from '../IconButton';

import styles from './FileCard.module.scss';
import { useTranslate } from '../../hooks/useTranslate';
import { HighlightIcon, type HighlightIconVariant } from '../HighlightIcon';
import type { IconName } from '../Icon';

export type FileCardVariant = 'alert' | 'neutral';

export type FileCardProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * The title to display in the file card
   */
  title: string | null;
  /**
   * The description to display in the file card
   */
  description?: ReactNode;
  /**
   * The file's mime type
   */
  mimeType?: string;
  /**
   * The visual style of the file card
   * @default neutral
   */
  variant?: FileCardVariant;
  /**
   * Whether the file card component should be highlighted
   * @default false
   */
  isHighlighted?: boolean;
  /**
   * Handler that is called when the file card is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Handler that is called when the delete icon is clicked
   */
  onDelete?: MouseEventHandler<HTMLButtonElement>;
};

export const FileCard = ({
  className,
  title,
  description,
  mimeType,
  variant = 'neutral',
  isHighlighted = false,
  onClick,
  onDelete,
  ...rest
}: FileCardProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const t = useTranslate();

  const { iconName, iconVariant } = getIconProps(mimeType);

  return (
    <article
      className={classNames(
        styles.fileCard,
        onClick && styles.clickableFileCard,
        className,
      )}
      data-variant={isHighlighted ? 'highlight' : variant}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      {...rest}
    >
      <button
        className={classNames(
          styles.fileCardButton,
          onClick && styles.clickableFileCardButton,
        )}
        type="button"
        onClick={onClick}
      >
        <HighlightIcon
          size={32}
          name={iconName}
          variant={iconVariant}
          aria-hidden="true"
        />
        <div className={styles.fileCardContent}>
          <div className={styles.fileCardTitle} id={titleId}>
            {title}
          </div>
          {description && (
            <div className={styles.fileCardDescription} id={descriptionId}>
              {description}
            </div>
          )}
        </div>
      </button>
      {onDelete && (
        <IconButton
          className={styles.fileCardDeleteIcon}
          aria-label={t('deleteWithName', { name: title ?? '' })}
          iconName="trash"
          onClick={onDelete}
        />
      )}
    </article>
  );
};

function getIconProps(mimeType: string | undefined): {
  iconName: IconName;
  iconVariant: HighlightIconVariant;
} {
  switch (mimeType) {
    case 'application/pdf':
      return {
        iconName: 'pdf',
        iconVariant: 'peach',
      };
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
      return {
        iconName: 'photo',
        iconVariant: 'lemon',
      };
    default:
      return {
        iconName: 'circle-question-filled',
        iconVariant: 'blue',
      };
  }
}
