import React from 'react';

import type { IconProps } from './iconProps';

export const PhoneIcon = ({
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
  role = 'image',
  ref,
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
      d="M3.5 2C2.67 2 2 2.67 2 3.5V5c0 7.04 5.6 12.77 12.58 13h1.92c.83 0 1.5-.67 1.5-1.5v-1.15c0-.7-.48-1.31-1.17-1.46l-3.22-.72c-.78-.17-1.55.29-1.77 1.05l-.204.7a.48.48 0 0 1-.635.323 11 11 0 0 1-6.244-6.244.48.48 0 0 1 .322-.635l.701-.204c.76-.22 1.22-1 1.05-1.77l-.72-3.22C5.96 2.49 5.35 2 4.65 2z"
    />
  </svg>
);
