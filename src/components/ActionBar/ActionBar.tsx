import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import styles from './ActionBar.module.css';
import type { IconName } from '../Icon';
import { Button } from '../Button';
import { useId } from '../../hooks/useId';
import type { Placement } from '@floating-ui/react';
import { Tooltip } from '../Tooltip';

export type Action = {
  text: string;
  onClick: () => void;
  iconName?: IconName;
  isDisabled?: boolean;
  isLoading?: boolean;
  tooltipContent?: string;
  tooltipPlacement?: Placement;
};

export type ActionBarProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Content positioned on the left side of the ActionBar
   */
  children: ReactNode;
  /**
   * List of actions for the user to perform
   */
  actions: Action[];
};

/**
 * List of actions for the user to perform
 */
export const ActionBar = ({ className, children, actions }: ActionBarProps) => {
  const labelId = useId();

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      aria-labelledby={labelId}
      className={classNames(styles.container, className)}
    >
      <p id={labelId}>{children}</p>
      <menu>
        {actions.map((action) => {
          return (
            <li key={action.text}>
              <Tooltip
                placement={action.tooltipPlacement || 'top'}
                content={action.tooltipContent || ''}
                isDisabled={!action.isDisabled}
                offset={16}
              >
                <Button
                  text={action.text}
                  variant="tertiaryComplementary"
                  onClick={action.onClick}
                  iconName={action.iconName}
                  isDisabled={action.isDisabled}
                  isLoading={action.isLoading}
                />
              </Tooltip>
            </li>
          );
        })}
      </menu>
    </div>
  );
};

/**
 * List of actions for the user to perform
 */
export const FloatingActionBar = (props: ActionBarProps) => {
  return (
    <div className={styles.floating}>
      <ActionBar {...props} />
    </div>
  );
};
