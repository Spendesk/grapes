import * as React from 'react';

/**
 * Reack hook to generate unique id
 */
export function useId() {
  const id = React.useId();

  return `grapes-${id}`;
}
