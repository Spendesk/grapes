import React from 'react';

import type { IconProps } from './iconProps';

export const FlagCheckeredIcon = ({
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
      d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.391c2.035-.429 3.968-.783 5.928.223 2.717 1.393 5.322.722 8.043-.115A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734c-1.611.34-3.085.626-4.596.513a8.2 8.2 0 0 1-2.472-.576A8 8 0 0 0 7.5 2.4c-1.322-.076-2.643.14-4 .426zm4 1.153c-1.087-.075-2.232.09-3.534.358l-.466.21v1.833a10.6 10.6 0 0 1 4-.486zm-4 5.85v1.573c1.212-.252 2.572-.498 4-.35V9.03c-1.368-.136-2.783.108-4 .725m9 2.627c1.22.053 2.509-.244 4-.686V9.837c-1.267.247-2.599.44-4 .35zm4-5.811V4.67c-1.286.254-2.608.451-4 .362V6.98c1.226.113 2.48-.1 4-.412m-8.5-.2v2.22c.555.089 1.1.236 1.619.444a9.3 9.3 0 0 0 2.38.606V7.422a7.2 7.2 0 0 1-1.563-.432A9.8 9.8 0 0 0 8 6.368"
      clipRule="evenodd"
    />
  </svg>
);
