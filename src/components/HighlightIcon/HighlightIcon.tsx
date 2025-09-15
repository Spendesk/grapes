import React, { forwardRef } from 'react';
import { classNames } from '../../utils';
import { Icon, type IconName } from '../Icon';

import styles from './HighlighIcon.module.css';
import type { IconSize } from '../Icon/Icon';

export type HighlightIconVariant =
  | 'alert'
  | 'info'
  | 'success'
  | 'warning'
  | 'neutral'
  | 'apricot'
  | 'blue'
  | 'carbon'
  | 'emerald'
  | 'forest'
  | 'grolive'
  | 'lemon'
  | 'ocean'
  | 'pink'
  | 'peach'
  | 'purple';
type Size = 24 | 32 | 40 | 56;

export type HighlightIconProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The icon to display in the component.
   */
  name: IconName;
  /**
   * The size of the element.
   * @default l
   */
  size?: Size;
  /**
   * The visual style of the HighlightIcon.
   * @default warning
   */
  variant?: HighlightIconVariant;
};

const getIconSize = (highlightIconSize: Size): IconSize => {
  switch (highlightIconSize) {
    case 24:
      return 's';
    case 32:
    case 40:
      return 'm';
    default:
      return 'l';
  }
};

export const HighlightIcon = /*@__PURE__*/ forwardRef<
  SVGSVGElement,
  HighlightIconProps
>(({ className, name, size = 56, variant = 'warning', ...rest }, ref) => {
  return (
    <div
      data-variant={variant}
      data-size={size}
      className={classNames(styles.highlightIcon, className)}
    >
      <Icon ref={ref} name={name} size={getIconSize(size)} {...rest} />
    </div>
  );
});
