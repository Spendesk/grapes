import React, { type ReactNode } from 'react';

import {
  TooltipContext,
  type TooltipOptions,
  useTooltip,
} from './TooltipContext';
import { TooltipTrigger } from './TooltipTrigger';
import { TooltipContent } from './TooltipContent';

export type TooltipProps = {
  /**
   * The content around which the tooltip will go
   */
  children: ReactNode;
  /**
   * The tooltip's content
   */
  content: ReactNode | ReactNode[];
  /**
   * Whether the trigger is a custom element
   * @see {@link storybook.spendesk.design/index.html?path=/docs/feedback-tooltip--docs#triggeraschild-and-forwardref} for more information.
   * @default false
   */
  triggerAsChild?: boolean;
  /**
   * The maximum width of the tooltip
   * @default 232
   */
  maxWidth?: number;
  /**
   * Whether the tooltip should be disabled
   * @default false
   */
  isDisabled?: boolean;
} & TooltipOptions;

/**
 * Displays informative text when users hover an element.
 * @see https://grapes.spendesk.design/docs/components/tooltip
 */
export function Tooltip({
  children,
  content,
  triggerAsChild = false,
  maxWidth = 232,
  isDisabled = false,
  ...options
}: TooltipProps) {
  const tooltip = useTooltip(options);

  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipContext.Provider value={tooltip}>
      <TooltipTrigger asChild={triggerAsChild}>{children}</TooltipTrigger>
      <TooltipContent maxWidth={maxWidth} isDisabled={isDisabled}>
        {content}
      </TooltipContent>
    </TooltipContext.Provider>
  );
}
