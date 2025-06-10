import React, { MouseEventHandler } from 'react';
import { classNames } from '../../utils';
import { Icon } from '../Icon';
import styles from './Anchor.module.css';

export type AnchorVariant = 'primary' | 'secondary';

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * A string representation of the Anchor location
   */
  href: string;
  /**
   * Whether the link should be open in new tab
   */
  isExternal?: boolean;
  /**
   * The visual style of the Anchor
   */
  variant?: AnchorVariant;
  /**
   * Handler called when the Link is clicked
   */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Anchor allow users to navigate to a different location
 */
export function Anchor({
  href,
  isExternal,
  children,
  className,
  variant,
  onClick,
  ...rest
}: AnchorProps) {
  const anchorAttributs = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : undefined;

  return (
    <a
      href={href}
      className={classNames(styles.anchor, className)}
      data-variant={variant}
      onClick={onClick}
      {...anchorAttributs}
      {...rest}
    >
      {children}
      {isExternal && <Icon name="arrow-top-right-square" size="s" />}
    </a>
  );
}
