import React from 'react';

import type { IconProps } from './iconProps';

export const ClipboardPinIcon = ({
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
      d="M11.76 19H4.205A2.2 2.2 0 0 1 2 16.8V3.2C2 1.985 2.987 1 4.205 1h5.913c.586 0 1.148.233 1.561.646l3.707 3.708c.413.413.644.972.644 1.554V9.24a5 5 0 0 0-1.538-.24 5.005 5.005 0 0 0-5.01 5c0 2.28 1.122 3.893 2.14 4.872zM3.98 6a.75.75 0 0 1 .752-.75h6.514a.75.75 0 1 1 0 1.5H4.732A.75.75 0 0 1 3.98 6m.752 2.25a.75.75 0 1 0 0 1.5H8.24a.75.75 0 1 0 0-1.5z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.339 18.966h-.002l-.003-.002-.009-.004-.031-.015-.11-.055a6.88 6.88 0 0 1-1.518-1.099c-.83-.798-1.681-2.046-1.681-3.792 0-1.933 1.57-3.5 3.507-3.5a3.504 3.504 0 0 1 3.508 3.5c0 1.746-.85 2.994-1.68 3.792a6.9 6.9 0 0 1-1.52 1.1l-.11.054-.03.015-.01.004-.002.002h-.001c-.1.043-.155.033-.155.033s-.055.01-.154-.033m.153-3.467c.83 0 1.504-.672 1.504-1.5s-.673-1.5-1.504-1.5c-.83 0-1.503.672-1.503 1.5s.673 1.5 1.503 1.5"
      clipRule="evenodd"
    />
  </svg>
);
