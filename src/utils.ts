import React from 'react';

export type As<Props = Record<string, unknown>> = React.ElementType<Props>;
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as: T;
};
export type Placement =
  | 'bottom-end'
  | 'bottom-start'
  | 'top-end'
  | 'top-start'
  | 'end-bottom'
  | 'end-top';

export function debugWarning(text: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(text);
  }
}

type Names = string | undefined | null | boolean;
/**
 * Utility for conditionally merging classNames together.
 * @example
 * classNames('foo', 'bar'); => 'foo bar'
 * @example
 * classnames(false && 'foo', 'bar'); => 'bar'
 */
export function classNames(...names: Names[]) {
  let out = '';
  for (let i = 0; i < names.length; i++) {
    if (names[i]) out += (out && ' ') + names[i];
  }
  return out;
}

export function getStyleFromPlacement(placement: Placement) {
  if (placement.startsWith('end')) {
    const left = 'calc(100% + var(--popover-offset))';
    return placement.endsWith('bottom')
      ? { left, top: '0' }
      : { left, bottom: '0' };
  }

  const isAtTheEnd = placement.endsWith('end');
  const right = isAtTheEnd ? '0' : 'initial';
  const left = isAtTheEnd ? 'initial' : 0;

  if (placement.startsWith('top')) {
    return { right, left, bottom: 'calc(100% + var(--popover-offset))' };
  }

  return { right, left, top: 'calc(100% + var(--popover-offset))' };
}

export class UnknownVariantError extends Error {
  constructor(variant: never) {
    super(`Unknown variant: ${variant}`);
  }
}

export class UnknownSizeError extends Error {
  constructor(size: never) {
    super(`Unknown size: ${size}`);
  }
}

export function supportInert(shouldBeInert: boolean): unknown {
  // @ts-expect-error "use" only exists in React 19
  if (typeof React.use === 'function') {
    return shouldBeInert;
  }
  return shouldBeInert ? '' : undefined;
}
