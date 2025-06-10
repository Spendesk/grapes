import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const RobotIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M10 2a1.5 1.5 0 0 1 .75 2.8V7h2.55a2.2 2.2 0 0 1 2.2 2.2v6.6a2.2 2.2 0 0 1-2.2 2.2H6.7a2.2 2.2 0 0 1-2.2-2.2V9.2A2.2 2.2 0 0 1 6.7 7h2.55V4.8A1.5 1.5 0 0 1 10 2m-1 8.988A.994.994 0 0 0 8 10c-.552 0-1 .442-1 .988 0 .545.448.987 1 .987s1-.442 1-.987m2.924.987c-.552 0-1-.442-1-.987a.994.994 0 0 1 1-.988c.553 0 1 .442 1 .988a.994.994 0 0 1-1 .987M8.56 13.721a.625.625 0 0 0-1.118.558c.43.863 1.486 1.346 2.559 1.346s2.128-.483 2.56-1.346a.625.625 0 0 0-1.12-.558c-.15.303-.667.654-1.44.654s-1.29-.351-1.44-.654"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M1 11a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0zM18 10a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1"
      />
    </svg>
  ),
);
