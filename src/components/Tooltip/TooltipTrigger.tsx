import React, {
  isValidElement,
  cloneElement,
  type HTMLProps,
  type Ref,
} from 'react';
import { useMergeRefs } from '@floating-ui/react';

import { useTooltipContext } from './TooltipContext';

type TooltipTriggerProps = HTMLProps<HTMLElement> & {
  asChild: boolean;
  ref?: Ref<HTMLElement>;
};
export const TooltipTrigger = ({
  children,
  asChild,
  ref,
  ...props
}: TooltipTriggerProps) => {
  const { refs, getReferenceProps } = useTooltipContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any)?.props?.ref;

  const mergeRefs = useMergeRefs([refs.setReference, ref, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      getReferenceProps({
        ...props,
        ...(children.props as Record<string, unknown>),
        ref: mergeRefs,
      }),
    );
  }

  return (
    <div ref={mergeRefs} {...getReferenceProps(props)}>
      {children}
    </div>
  );
};
