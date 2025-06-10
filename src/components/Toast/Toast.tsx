import React, { ReactNode } from 'react';
import { classNames } from '../../utils';

import { Icon } from '../Icon';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import styles from './Toast.module.scss';
import { useId } from '../../hooks/useId';
import { useTranslate } from '../../hooks/useTranslate';
import { colors } from '../../colors';

export type ToastVariant = 'alert' | 'success';

export type ToastProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Content of the Toast
   */
  children?: ReactNode;
  /**
   * The title to display in the Toast
   */
  title: ReactNode;
  /**
   * The visual style of the Toast
   * @default success
   */
  variant?: ToastVariant;
  /**
   * Handler that is called when the element is closed
   */
  onClose: () => void;
  /**
   * The action to display at the bottom of the Toast
   */
  action?: {
    text: string;
    isLoading?: boolean;
    onClick: () => void;
  };
};

/**
 * The Toast component is used to give feedback to users after an action has taken place.
 * The toast should close after 5 seconds.
 */
export const Toast = ({
  className,
  children,
  title,
  variant = 'success',
  action,
  onClose,
  ...rest
}: ToastProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const t = useTranslate();

  return (
    <output
      aria-labelledby={titleId}
      aria-describedby={children ? descriptionId : undefined}
      data-variant={variant}
      className={classNames(styles.toast, className)}
      {...rest}
    >
      <Icon
        className={styles.toastIcon}
        name={variant === 'alert' ? 'hexagone-cross' : 'circle-check'}
        aria-hidden="true"
      />
      <span id={titleId}>{title}</span>
      <IconButton
        iconName="cross"
        onClick={() => onClose()}
        iconColor={colors.contentComplementary}
        aria-label={t('close')}
      />
      {children && (
        <div id={descriptionId} className={styles.toastContent}>
          {children}
        </div>
      )}
      {action && (
        <Button
          variant="tertiaryComplementary"
          onClick={action.onClick}
          text={action.text}
          className={styles.toastAction}
          hasNegativeMargins
        />
      )}
    </output>
  );
};
