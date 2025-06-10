import { createContext, useContext, useMemo, useRef, useState } from 'react';

import {
  arrow,
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';

export type TooltipOptions = {
  /**
   * Whether the button should be disabled
   * @default false
   */
  isInitialOpen?: boolean;
  /**
   * Specifies where the tooltip should be positioned
   * @default top
   */
  placement?: Placement;
  /**
   * Whether the tooltip should be open
   */
  isOpen?: boolean;
  /**
   * Allows to control when the tooltip is open
   */
  onOpenChange?: (isOpen: boolean) => void;
};

export const useTooltip = ({
  isInitialOpen = false,
  placement = 'top',
  isOpen: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(isInitialOpen);
  const arrowRef = useRef(null);

  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const { context } = data;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      ...interactions,
      ...data,
      arrowRef,
    }),
    [isOpen, setIsOpen, interactions, data],
  );
};

type ContextType = ReturnType<typeof useTooltip> | null;

export const TooltipContext = createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);

  if (context === null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};
