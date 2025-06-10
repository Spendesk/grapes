import React, { forwardRef } from 'react';
import { classNames } from '../../utils';

import { Icon, IconName } from '../Icon/Icon';

import styles from './IconButton.module.scss';

export type IconButtonVariant =
  | 'primaryBrand'
  | 'primaryInfo'
  | 'primarySuccess'
  | 'primaryWarning'
  | 'primaryAlert'
  | 'secondaryBrand'
  | 'secondaryNeutral'
  | 'secondaryInfo'
  | 'secondarySuccess'
  | 'secondaryWarning'
  | 'secondaryAlert'
  | 'tertiaryBrand'
  | 'tertiaryNeutral'
  | 'tertiaryInfo'
  | 'tertiarySuccess'
  | 'tertiaryWarning'
  | 'tertiaryAlert';

export type IconButtonProps = {
  /**
   * The icon to display in the button
   */
  iconName: IconName;
  /**
   * The visual style of the button
   * @default borderless
   */
  variant?: IconButtonVariant;
  /**
   * Whether the button should be disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the button should have negative margins. Has effect only on bordeless variant
   * @default false
   */
  hasNegativeMargins?: boolean;
  /**
   * className for the element
   */
  className?: string;
  /**
   * The color of the Icon
   */
  iconColor?: string;

  /**
   * Label for the button
   */
  'aria-label': string;
} & Omit<
  React.HTMLProps<HTMLButtonElement>,
  'type' | 'aria-label' | 'aria-hidden'
>;

/**
 * Allow users to perform an action or to navigate to another page.
 * No visible label is provided when using an IconButton.
 * As a result, a text label must be provided to identify the control for accessibility.
 * This should be added using the `aria-label` prop.
 * @see https://grapes.spendesk.design/docs/components/icon-button
 */
export const IconButton = /*@__PURE__*/ forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(
  (
    {
      className,
      iconName,
      isDisabled = false,
      variant = 'tertiaryNeutral',
      hasNegativeMargins = false,
      onClick,
      iconColor,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={classNames(
          styles.iconButton,
          variant.startsWith('tertiary') &&
            hasNegativeMargins &&
            styles.withNegativeMarginsIconButton,
          className,
        )}
        data-variant={variant}
        disabled={isDisabled}
        onClick={onClick}
        title={rest['aria-label']}
        {...rest}
      >
        <Icon
          className={styles.iconButtonIcon}
          size="m"
          name={iconName}
          color={iconColor}
          aria-hidden="true"
        />
      </button>
    );
  },
);
