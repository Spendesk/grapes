import React from 'react';

import type { IconProps } from './iconProps';

export const BedIcon = ({
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
      d="M15.0498 9C16.679 9 18 10.321 18 11.9502V16.25C18 16.6642 17.6642 17 17.25 17C16.8358 17 16.5 16.6642 16.5 16.25V15H3.5V16.25C3.5 16.6642 3.16421 17 2.75 17C2.33579 17 2 16.6642 2 16.25V11.9502C2 10.321 3.32096 9 4.9502 9H15.0498ZM14.7998 3C16.0148 3 17 3.98517 17 5.2002V7.9502C16.5389 7.72495 16.0336 7.57607 15.5 7.52246V6.5C15.5 5.94772 15.0523 5.5 14.5 5.5H11.75C11.1977 5.5 10.75 5.94772 10.75 6.5V7.5H9.25V6.5C9.25 5.94772 8.80228 5.5 8.25 5.5H5.5C4.94772 5.5 4.5 5.94772 4.5 6.5V7.52246C3.96641 7.57607 3.4611 7.72495 3 7.9502V5.2002C3 3.98517 3.98517 3 5.2002 3H14.7998Z"
      fill="currentColor"
    />
  </svg>
);
