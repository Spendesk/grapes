import React from 'react';

import type { IconProps } from './iconProps';

export const PenIcon = ({
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
      fillRule="evenodd"
      d="M17.179 1.644a2.2 2.2 0 0 0-3.11 0l-.099.1a.5.5 0 0 0 0 .706l3.58 3.58a.5.5 0 0 0 .707 0l.099-.1a2.2 2.2 0 0 0 0-3.109zm-.765 5.34a.583.583 0 0 1 0 .82l-9.358 9.41c-.37.372-.833.636-1.34.765l-3.998 1.004a.576.576 0 0 1-.7-.704l1-4.023c.126-.51.388-.976.758-1.348l9.357-9.41a.575.575 0 0 1 .816 0l.774.779a.583.583 0 0 1 0 .82l-7.779 7.817a.784.784 0 0 0 1.112 1.107l7.773-7.811c.225-.226.678-.138.903.088z"
      clipRule="evenodd"
    />
  </svg>
);
