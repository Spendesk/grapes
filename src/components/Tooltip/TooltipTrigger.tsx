import React, {
  forwardRef,
  isValidElement,
  cloneElement,
  type HTMLProps,
} from 'react';
import { useMergeRefs } from '@floating-ui/react';

import { useTooltipContext } from './TooltipContext';

export const TooltipTrigger = /*@__PURE__*/ forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & { asChild: boolean }
>(({ children, asChild, ...props }, propRef) => {
  const { refs, getReferenceProps } = useTooltipContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      getReferenceProps({
        ref,
        ...props,
        ...children.props,
      }),
    );
  }

  return (
    <div ref={ref} {...getReferenceProps(props)}>
      {children}
    </div>
  );
});
