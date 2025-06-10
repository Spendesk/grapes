import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const CardStrikeoutIcon = /*@__PURE__*/ forwardRef<
  SVGSVGElement,
  IconProps
>(
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
        d="M2.212 2.22a.75.75 0 0 1 1.062 0l14.514 14.5a.75.75 0 1 1-1.062 1.06L2.212 3.28a.75.75 0 0 1 0-1.06M1.113 4.917a1.5 1.5 0 0 1 .252-.41L3.84 6.979H1.749c-.232 0-.347 0-.439-.037a.5.5 0 0 1-.272-.273C1 6.58 1 6.462 1 6.231c0-.693 0-1.04.113-1.314M5.855 8.993H2.001c-.472 0-.708 0-.854.146C1 9.286 1 9.522 1 9.993v3.02c0 1.414 0 2.121.44 2.56s1.147.44 2.563.44h8.879zM7.043 3.987l2.996 2.992h8.212c.232 0 .347 0 .439-.037a.5.5 0 0 0 .272-.273C19 6.58 19 6.462 19 6.231c0-.693 0-1.04-.113-1.314a1.5 1.5 0 0 0-.818-.818c-.274-.112-.621-.112-1.315-.112zM18.6 15.532l-6.546-6.539H18c.472 0 .708 0 .854.146.147.147.147.383.147.854v3.02c0 1.37 0 2.077-.4 2.52"
      />
    </svg>
  ),
);
