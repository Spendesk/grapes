import React from 'react';

import type { IconProps } from './iconProps';

export const CardLightningIcon = ({
  ref,
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
  role = 'image',
  ...rest
}: IconProps) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox={viewBox}
    role={role}
    {...rest}
  >
    <path
      fill="currentColor"
      d="M17 4.95c0 .268-.224.486-.5.486h-15A.494.494 0 0 1 1 4.95v-.487C1 3.655 1.672 3 2.5 3h13c.828 0 1.5.655 1.5 1.462z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.83 13.72H2.5c-.828 0-1.5-.654-1.5-1.461v-4.43c0-.27.224-.488.5-.488h11.67l-3.103 4.891a1.86 1.86 0 0 0-.238 1.489"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="m11.343 13 3.503-5.522c.256-.404.895-.227.895.249v2.776h2.776c.379 0 .611.405.413.72l-3.506 5.552c-.256.405-.897.228-.897-.248v-2.806h-2.772c-.38 0-.611-.406-.412-.72"
    />
  </svg>
);
