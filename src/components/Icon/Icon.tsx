import React, { type Ref } from 'react';

import { iconMap } from '../../icons';

export type IconName = keyof typeof iconMap;
export type IconSize = 's' | 'm' | 'l' | 'xl';

export type IconProps = {
  ref?: Ref<SVGSVGElement>;
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The size of the Icon.
   * @default m
   */
  size?: IconSize;
  /**
   * The color of the Icon.
   * @default currentColor
   */
  color?: string;
  /**
   * The icon to display.
   */
  name: IconName;
};

const getIconSize = (iconSize: IconSize): 14 | 16 | 24 | 32 => {
  switch (iconSize) {
    case 's':
      return 14;
    case 'l':
      return 24;
    case 'xl':
      return 32;
    default:
      return 16;
  }
};

export const Icon = ({
  className,
  size = 'm',
  color = 'currentColor',
  name,
  ref,
  ...rest
}: IconProps) => {
  const IconComponent = iconMap[name];

  if (IconComponent === undefined) {
    throw new Error(`Unknown icon name: ${name}`);
  }

  const iconSize = getIconSize(size);

  return (
    <IconComponent
      ref={ref}
      role="img"
      className={className}
      height={iconSize}
      width={iconSize}
      data-icon={name}
      viewBox="0 0 20 20"
      color={color}
      {...rest}
    />
  );
};
