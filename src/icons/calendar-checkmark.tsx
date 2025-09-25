import React from 'react';

import type { IconProps } from './iconProps';

export const CalendarCheckmarkIcon = ({
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
      d="M13.1 10.7a.75.75 0 1 0-1.2-.9l-2.481 3.308L8.03 11.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.5 2.75a.75.75 0 0 0-1.5 0V4h-.25A2.75 2.75 0 0 0 2 6.75v8.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-8.5A2.75 2.75 0 0 0 15.25 4H15V2.75a.75.75 0 0 0-1.5 0V4h-7zm-3 6.5C3.5 8.56 4.06 8 4.75 8h10.5c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25z"
      clipRule="evenodd"
    />
  </svg>
);
