import React from 'react';

import type { IconProps } from './iconProps';

export const CircleQuestionFilledIcon = ({
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
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16M8.869 6.986c-.23.289-.334.669-.334.971a.75.75 0 1 1-1.5 0c0-.59.19-1.313.66-1.905C8.187 5.433 8.957 5 10 5c1.271 0 2.06.567 2.497 1.248.402.628.467 1.29.467 1.53 0 .7-.195 1.241-.526 1.672-.301.39-.69.653-.972.843l-.02.013c-.318.214-.511.35-.649.524-.111.14-.209.336-.209.708a.75.75 0 0 1-1.5 0c0-.69.2-1.22.534-1.641.293-.369.67-.623.945-.807l.04-.027c.31-.21.505-.35.642-.528.114-.148.215-.361.215-.757v-.022l-.006-.06a1.6 1.6 0 0 0-.224-.639C11.069 6.8 10.75 6.5 10 6.5c-.585 0-.923.224-1.131.486M11 14.242a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      clipRule="evenodd"
    />
  </svg>
);
