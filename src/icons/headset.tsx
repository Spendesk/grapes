import React from 'react';

import type { IconProps } from './iconProps';

export const HeadsetIcon = ({
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
      d="M7 0C3.13401 0 0 3.13401 0 7V11.75C0 12.4404 0.559644 13 1.25 13H2.74993C3.44029 13 3.99993 12.4404 3.99993 11.75V9.25C3.99993 8.55964 3.44029 8 2.74993 8H1.5V7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7V8H11.2499C10.5596 8 9.99993 8.55964 9.99993 9.25V11.75C9.99993 12.4404 10.5596 13 11.2499 13H12.5V13.25C12.5 13.9404 11.9404 14.5 11.25 14.5H9.47524C9.35996 13.9295 8.85581 13.5 8.25134 13.5C7.56042 13.5 7.00269 14.061 7.00269 14.7493C7.00269 15.4384 7.56102 16 8.25269 16H11.25C12.7688 16 14 14.7688 14 13.25V7C14 3.13401 10.866 0 7 0Z"
      fill="currentColor"
    />
  </svg>
);
