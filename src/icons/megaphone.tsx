import React, { forwardRef } from 'react';

import type { IconProps } from './iconProps';

export const MegaphoneIcon = /*@__PURE__*/ forwardRef<SVGSVGElement, IconProps>(
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
        d="M13.92 3.833a19.5 19.5 0 0 1-6.3 1.968q-1.285.173-2.62.174c-2.21 0-4 1.78-4 3.975 0 2.026 1.525 3.698 3.496 3.944.292 1.131.714 2.245 1.271 3.32.397.767 1.342.994 2.05.587l.867-.497c.726-.417.94-1.313.588-2.009a12 12 0 0 1-.448-.997c1.8.355 3.511.958 5.096 1.77A17.8 17.8 0 0 0 15 9.95c0-2.148-.381-4.208-1.08-6.117M15.243 3.09A19.2 19.2 0 0 1 16.5 9.95c0 2.416-.445 4.728-1.257 6.861l-.03.077a.744.744 0 0 0 .432.963.75.75 0 0 0 .97-.43q.128-.334.246-.674c.554-1.6.918-3.287 1.065-5.035A1.99 1.99 0 0 0 19 9.95c0-.766-.436-1.43-1.074-1.762a20.7 20.7 0 0 0-1.312-5.71.75.75 0 0 0-.969-.428.744.744 0 0 0-.431.962z"
      />
    </svg>
  ),
);
