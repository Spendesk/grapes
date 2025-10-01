import React from 'react';

import type { IconProps } from './iconProps';

export const InvoiceIcon = ({
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
      d="M9.453 10.938V9.25h4.229v1.688zM9.453 12.188h4.229v3.356H9.453zM8.203 12.188v3.356H6.25v-3.357zM8.203 10.938H6.25V9.25h1.953z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.2 19h9.6a2.2 2.2 0 0 0 2.2-2.2V6.908a2.2 2.2 0 0 0-.642-1.554l-3.7-3.708A2.2 2.2 0 0 0 11.101 1H5.2A2.2 2.2 0 0 0 3 3.2v13.6A2.2 2.2 0 0 0 5.2 19M5 5c0-.552.363-1 .81-1h5.36c.447 0 .81.448.81 1s-.363 1-.81 1H5.81C5.364 6 5 5.552 5 5m9.749 3.183A.63.63 0 0 0 14.307 8H5.625A.625.625 0 0 0 5 8.625v7.544c0 .346.28.625.625.625h8.682a.625.625 0 0 0 .625-.625V8.625a.63.63 0 0 0-.183-.442"
      clipRule="evenodd"
    />
  </svg>
);
