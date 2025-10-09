import React from 'react';

import type { IconProps } from './iconProps';

export const ScissorsIcon = ({
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
  role = 'image',
  ref,
  ...rest
}: IconProps) => (
  <svg
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    role={role}
    width={width}
    height={height}
    {...rest}
  >
    <g fill="currentColor">
      <path d="M1.47 3.75a3.5 3.5 0 0 0 5.62 4.1l.88.52c.02.1.15.12.2.04.16-.17.33-.34.5-.48.3-.23.3-.71 0-.9l-.83-.47a3.5 3.5 0 0 0-6.37-2.81ZM3.5 7.23a2 2 0 1 1 2-3.46 2 2 0 0 1-2 3.46ZM9.96 8.32c-.79.33-1.37 1-1.6 1.82l-.39 1.5-.88.5a3.5 3.5 0 1 0 .75 1.3L18.5 7.27a.75.75 0 0 0-.18-1.37l-.7-.19a2.75 2.75 0 0 0-1.78.12l-5.9 2.5Zm-7.2 7.18a2 2 0 1 1 3.47-2 2 2 0 0 1-3.46 2Z" />
      <path d="M12.52 11.89a.5.5 0 0 0 .06.9l3.27 1.38c.56.23 1.19.28 1.78.12l.7-.2a.75.75 0 0 0 .18-1.36l-3.47-2a.5.5 0 0 0-.5 0l-2.02 1.16Z" />
    </g>
  </svg>
);
