import React from 'react';

import type { IconProps } from './iconProps';

export const BellDeskIcon = ({
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
      d="M12.255 3H7.748a.748.748 0 0 0-.01 1.497l1.497.018v.744a.75.75 0 1 0 1.5 0v-.758l1.524-.009A.746.746 0 0 0 12.255 3M10.002 6.99c-4.289 0-7.733 2.317-7.987 6.506a.48.48 0 0 0 .485.501h15a.48.48 0 0 0 .485-.501c-.253-4.189-3.694-6.505-7.983-6.506M10.002 6.99h.002H10zM1 16.25a.75.75 0 0 1 .75-.751h16.5a.75.75 0 0 1 0 1.501H1.75a.75.75 0 0 1-.75-.75"
    />
  </svg>
);
