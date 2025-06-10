import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const ClipboardIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
  (
    { width = 20, height = 20, viewBox = '0 0 20 20', role = 'image', ...rest },
    ref,
  ) => (
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
        d="M7.5 5h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-.774a1.99 1.99 0 0 0-3.452 0H7.5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1M9 3.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 9 3.25"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M14.99 4c0-.276.234-1 .51-1A1.5 1.5 0 0 1 17 4.5v13a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 17.5v-13A1.5 1.5 0 0 1 4.5 3c.276 0 .49.724.49 1v.5a2.003 2.003 0 0 0 2 2h6a2.003 2.003 0 0 0 2-2z"
      />
    </svg>
  ),
);
