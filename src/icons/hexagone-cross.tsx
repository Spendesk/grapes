import React from 'react';

import type { IconProps } from './iconProps';

export const HexagoneCrossIcon = ({
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
      fillRule="evenodd"
      d="M7.455 2c-.492 0-.964.195-1.312.543l-3.6 3.6C2.195 6.49 2 6.963 2 7.455v5.09c0 .492.195.964.543 1.312l3.6 3.6c.348.348.82.543 1.312.543h5.09c.492 0 .964-.195 1.312-.544l3.6-3.599c.348-.348.543-.82.543-1.312v-5.09c0-.492-.195-.964-.544-1.312l-3.599-3.6A1.86 1.86 0 0 0 12.545 2zm-.207 5.249c.29-.29.76-.29 1.05 0L10 8.95l1.702-1.701a.742.742 0 1 1 1.05 1.05L11.048 10l1.702 1.702a.742.742 0 1 1-1.05 1.05L10 11.05 8.298 12.75a.742.742 0 0 1-1.05-1.05L8.95 10 7.248 8.298a.74.74 0 0 1 0-1.05"
      clipRule="evenodd"
    />
  </svg>
);
