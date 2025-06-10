import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CarIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M12.742 2.5a2.75 2.75 0 0 1 2.484 1.57l1.634 3.44 1.138-.005a.998.998 0 1 1 .004 1.995H18l-.009 3.805a2.2 2.2 0 0 1-1.007 1.844l.006.846a1.494 1.494 0 1 1-2.989.01V15.5H5.985l.004.495a1.494 1.494 0 1 1-2.989.01v-.864a2.2 2.2 0 0 1-.995-1.846L2.013 9.5h-.02a.993.993 0 0 1-.005-1.985l1.157-.006L4.81 4.056A2.75 2.75 0 0 1 7.287 2.5zm-7.927 5h10.38L13.87 4.714A1.25 1.25 0 0 0 12.742 4H7.287c-.48 0-.918.275-1.126.707zM7 10.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M14.25 12a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
        clipRule="evenodd"
      />
    </svg>
  ),
);
