import React, { type ReactNode, useRef } from 'react';
import { classNames, getStyleFromPlacement, type Placement } from '../../utils';

import { useId } from '../../hooks/useId';
import { useWindowEvent } from '../../hooks/useWindowEvent';

import { useAnimationState } from '../../hooks/useAnimationState';

import styles from './Popover.module.css';
import commonStyles from '../../theme/placeholders/common.module.css';

export type TriggerProps = {
  'aria-expanded': boolean;
  'aria-controls': string;
  'aria-haspopup': 'dialog';
  id: string;
  isDropdown: boolean;
  onClick: () => void;
};

export type PopoverProps = {
  /**
   * The contents of the Popover
   */
  children: (closeDropdown: () => void) => ReactNode;
  /**
   * Function to render the button trigger
   */
  renderTrigger: (triggerProps: TriggerProps, isOpen: boolean) => ReactNode;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Whether the Popover should be align at the start or end of the trigger
   * @default bottom-start
   */
  placement?: Placement;
};

export const Popover = ({
  children,
  renderTrigger,
  className,
  placement = 'bottom-start',
}: PopoverProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const buttonId = useId();
  const [isVisible, isClosing, , closePopover, togglePopover] =
    useAnimationState('close');

  useWindowEvent('mousedown', (event) => {
    const { current: el } = rootRef;

    if (el && el.contains(event.target as Node)) {
      return;
    }
    closePopover();
  });

  useWindowEvent(
    'focus',
    () => {
      const { current: el } = rootRef;

      if (el && el.contains(document.activeElement)) {
        return;
      }
      closePopover();
    },
    true,
  );

  return (
    <div
      className={classNames(styles.popoverWrapper, className)}
      ref={rootRef}
      data-placement={placement}
    >
      {renderTrigger(
        {
          'aria-expanded': isVisible,
          'aria-controls': dialogId,
          'aria-haspopup': 'dialog',
          id: buttonId,
          isDropdown: true,
          onClick: togglePopover,
        },
        isVisible,
      )}
      {isVisible && (
        <div
          id={dialogId}
          className={classNames(styles.popover, commonStyles.dropdownContent)}
          style={getStyleFromPlacement(placement)}
          role="dialog"
          tabIndex={-1}
          aria-labelledby={buttonId}
          data-closing={isClosing}
        >
          {children(closePopover)}
        </div>
      )}
    </div>
  );
};
