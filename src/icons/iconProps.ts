import type { Ref } from 'react';

export type IconProps = {
  ref?: Ref<SVGSVGElement>;
  role: string;
  className?: string;
  width: 14 | 16 | 20 | 24 | 32;
  height: 14 | 16 | 20 | 24 | 32;
  viewBox: string;
  color: string;
};
