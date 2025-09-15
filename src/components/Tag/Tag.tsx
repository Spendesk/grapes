import React, {
  forwardRef,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { classNames } from '../../utils';

import { Icon, type IconName } from '../Icon';
import { useId } from '../../hooks/useId';
import { useTranslate } from '../../hooks/useTranslate';

import styles from './Tag.module.css';

export type TagVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'alert'
  | 'carbon'
  | 'grolive'
  | 'forest'
  | 'lemon'
  | 'ocean'
  | 'purple'
  | 'pink'
  | 'peach'
  | 'white';

export type TagProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * The visual style of the Tag
   * @default carbon
   */
  variant?: TagVariant;
  /**
   * The icon to display in the Tag
   */
  iconName?: IconName;
  /**
   * The content to display in the tag.
   */
  children: ReactNode;
  /**
   * Handler that is called when the close icon is clicked
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

/**
 * Compact element to display information about an entity.
 * @see https://grapes.spendesk.design/docs/components/tag
 */
export const Tag = /*@__PURE__*/ forwardRef<HTMLSpanElement, TagProps>(
  (
    { className, variant = 'carbon', children, iconName, onClose, ...rest },
    ref,
  ) => {
    const textId = useId();
    const t = useTranslate();

    return (
      <span
        ref={ref}
        className={classNames(styles.tag, className)}
        role="status"
        data-variant={variant}
        aria-labelledby={textId}
        {...rest}
      >
        <span className={styles.tagContent} id={textId}>
          {iconName && <Icon name={iconName} size="s" aria-hidden="true" />}
          {children}
          {onClose && (
            <button
              className={styles.tagCloseButton}
              onClick={onClose}
              aria-label={t('close')}
            >
              <Icon name="cross" size="s" aria-hidden="true" />
            </button>
          )}
        </span>
      </span>
    );
  },
);
