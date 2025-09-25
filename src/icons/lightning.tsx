import React from 'react';

import type { IconProps } from './iconProps';

export const LightningIcon = ({
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
      d="M3.132 11.609 9.474 1.414c.464-.747 1.622-.42 1.622.459v5.118h5.026a.872.872 0 0 1 .747 1.33L10.52 18.583c-.464.748-1.623.422-1.623-.457v-5.188h-5.02a.872.872 0 0 1-.746-1.33"
    />
  </svg>
);
