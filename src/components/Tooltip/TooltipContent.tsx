import React, { type Ref } from 'react';
import {
  useMergeRefs,
  FloatingArrow,
  FloatingPortal,
} from '@floating-ui/react';

import { useTooltipContext } from './TooltipContext';
import { colors } from '../../colors';

import styles from './Tooltip.module.css';

type TooltipContentProps = React.HTMLProps<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
  maxWidth: number;
  isDisabled: boolean;
};
export const TooltipContent = ({
  style,
  children,
  maxWidth,
  isDisabled,
  ref,
  ...props
}: TooltipContentProps) => {
  const { floatingStyles, isOpen, refs, arrowRef, context, getFloatingProps } =
    useTooltipContext();
  const mergeRefs = useMergeRefs([refs.setFloating, ref]);

  if (isDisabled || !isOpen) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        ref={mergeRefs}
        style={{
          ...floatingStyles,
          ...style,
          maxWidth,
        }}
        {...getFloatingProps({
          ...props,
          className: styles.tooltipContent,
        })}
      >
        {children}
        <FloatingArrow
          ref={arrowRef}
          context={context}
          tipRadius={1}
          fill={colors.backgroundComplementaryDefault}
          width={14}
          height={6}
        />
      </div>
    </FloatingPortal>
  );
};
