import React from 'react';

import type { IconProps } from './iconProps';

export const SlackIcon = ({
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
      d="M6.267 3.6a1.6 1.6 0 0 1 3.2 0v1.6h-1.6a1.6 1.6 0 0 1-1.48-.988 1.6 1.6 0 0 1-.12-.612M3.6 6.267h4.267a1.6 1.6 0 0 1 0 3.2H3.6a1.6 1.6 0 0 1 0-3.2M16.4 6.267a1.6 1.6 0 0 1 0 3.2h-1.6v-1.6a1.6 1.6 0 0 1 1.6-1.6M13.733 3.6v4.267a1.6 1.6 0 0 1-1.6 1.6 1.6 1.6 0 0 1-1.6-1.6V3.6a1.6 1.6 0 0 1 3.2 0M12.133 18a1.603 1.603 0 0 0 1.6-1.6 1.597 1.597 0 0 0-1.6-1.6h-1.6v1.6a1.6 1.6 0 0 0 1.6 1.6M12.133 13.734H16.4a1.6 1.6 0 0 0 0-3.2h-4.267a1.6 1.6 0 0 0 0 3.2M2.121 12.745A1.6 1.6 0 0 1 3.6 10.533h1.6v1.6a1.597 1.597 0 0 1-1.6 1.6 1.6 1.6 0 0 1-1.479-.988M6.267 16.4v-4.267a1.6 1.6 0 0 1 3.2 0V16.4a1.597 1.597 0 0 1-1.6 1.6 1.6 1.6 0 0 1-1.6-1.6"
    />
  </svg>
);
