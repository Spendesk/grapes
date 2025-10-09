import React, { useRef } from 'react';
import { classNames } from '../../utils';
import { Icon, type IconName } from '../Icon';

import styles from './Avatar.module.css';
import useImage, { Status } from '../../hooks/useImage';
import type { IconSize } from '../Icon/Icon';

export type AvatarSize = 16 | 24 | 32 | 40 | 56;
export type AvatarVariant = 'circle' | 'square';

export type AvatarSource =
  | {
      /**
       * The image URL
       */
      src?: string;
      /**
       * The fallback source to display when src is not provided or src is not valid.
       * If defined, the Avatar component will not fallback on text initials.
       */
      fallbackSrc?: string;
      /**
       * The name of the icon to display
       */
      iconName?: never;
    }
  | {
      src?: never;
      fallbackSrc?: never;
      iconName: IconName;
    };

export type AvatarBadgeProps = {
  /**
   * Whether the Avatar should be square or circle
   * @default circle
   */
  variant?: AvatarVariant;
  /**
   * The text to display whether src is not provided or src is not valid. The text will be truncated to one character.
   * Random colors, based on the truncated text, will be assign automatically as background and text color.
   */
  text: string;
} & AvatarSource;

export type AvatarProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Whether the Avatar should contains a badge
   */
  badgeProps?: AvatarBadgeProps;
  /**
   * Whether the Avatar src should be lazy loaded
   * @default false
   */
  lazyLoad?: boolean;
  /**
   * Specifies the size of the element.
   * @default m
   */
  size?: AvatarSize;
} & AvatarBadgeProps;

/**
 * The Avatar component is used to represent a user or a entity.
 * It displays a picture or a fallback to initials.
 * @see https://grapes.spendesk.design/docs/components/avatar
 */
export const Avatar = ({
  text,
  badgeProps,
  className,
  size = 32,
  src,
  iconName,
  fallbackSrc,
  variant = 'circle',
  lazyLoad = false,
  ...rest
}: AvatarProps) => {
  const hasBadge = badgeProps !== undefined;
  const ref = useRef<HTMLSpanElement>(null);
  const imageStatus = useImage(ref, src, lazyLoad);

  const badge = hasBadge && (
    <Avatar
      {...badgeProps}
      lazyLoad={lazyLoad}
      className={styles.avatarBadge}
      size={size === 40 ? 24 : 16}
    />
  );

  const truncatedText = getTruncatedText(text);

  const renderContent = () => {
    if (iconName) {
      return (
        <span
          className={classNames(
            styles.backgroundContainer,
            getColorVariantClassName(truncatedText),
          )}
        >
          <Icon name={iconName} size={getIconSize(size)} />
        </span>
      );
    }
    if (imageStatus !== Status.Loaded) {
      if (fallbackSrc) {
        return <img className={styles.content} src={fallbackSrc} alt={text} />;
      }
      return (
        <span
          role="img"
          aria-label={text}
          className={classNames(
            styles.backgroundContainer,
            getColorVariantClassName(truncatedText),
          )}
        >
          {truncatedText}
        </span>
      );
    }
    return <img className={styles.content} src={src} alt={text} />;
  };

  return (
    <span
      ref={ref}
      className={classNames(styles.avatar, className)}
      {...rest}
      data-size={size}
    >
      <span data-variant={variant} className={styles.content}>
        {renderContent()}
      </span>
      {badge}
    </span>
  );
};

function getColorVariantClassName(text = ' ') {
  const variant = [
    styles.apricot,
    styles.lemon,
    styles.peach,
    styles.blue,
    styles.pink,
    styles.ocean,
    styles.forest,
    styles.emerald,
    styles.raspberry,
  ];

  const score = text.charCodeAt(0);
  const index = score % variant.length;
  return variant[index];
}

function getTruncatedText(name: string) {
  const match = /([a-z0-9])/im.exec(name);
  return match ? match[0] : ' ';
}

function getIconSize(avatarSize: AvatarSize): IconSize {
  switch (avatarSize) {
    case 16:
      return 's';
    case 24:
      return 's';
    case 32:
      return 'm';
    case 40:
      return 'l';
    case 56:
      return 'xl';
    default:
      return 'm';
  }
}
