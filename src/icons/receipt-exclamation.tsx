import React from 'react';

import type { IconProps } from './iconProps';

export const ReceiptExclamationIcon = ({
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
      d="M3 3.2C3 1.98 3.98 1 5.2 1h9.6c1.21 0 2.2.98 2.2 2.2v15.05a.75.75 0 0 1-1.07.68l-2.8-1.35-2.8 1.35c-.21.1-.45.1-.65 0l-2.8-1.35-2.8 1.35A.75.75 0 0 1 3 18.25V3.2Zm6.25 1.55v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0ZM9.98 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    />
  </svg>
);
