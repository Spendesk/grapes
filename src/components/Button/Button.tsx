import React, { useEffect, useState, type Ref } from 'react';
import { classNames } from '../../utils';

import { Icon, type IconName } from '../Icon';

import styles from './Button.module.css';
import commonStyles from '../../theme/common.module.css';

export type ButtonVariant =
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
  | 'tertiaryAlert'
  | 'tertiaryComplementary';

interface CommonBase {
  ref?: Ref<HTMLButtonElement>;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Specifies the width of the element
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * The icon to display in the button
   */
  iconName?: IconName;
  /**
   * Specifies where the icon is positioned
   * @default left
   */
  iconPosition?: 'left' | 'right';
  /**
   * Whether the button should be disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the button should be is loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * The text to display in the button.
   */
  text: string;
  /**
   * The visual style of the button
   * @default primaryBrand
   */
  variant?: ButtonVariant;
  /**
   * Whether the button should have negative margins. Has effect only on ghost variant
   * @default false
   */
  hasNegativeMargins?: boolean;
  /**
   * Whether the button should have no horizontal padding. Has effect only on tertiary variant
   * @default false
   */
  hasNoHorizontalPadding?: boolean;
  /**
   * Whether the button is being used as a dropdown button. It adds the chevron-down icon.
   * @default false
   */
  isDropdown?: boolean;
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  /**
   * The HTML element element used to render the button
   */
  component?: 'button';
}

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  /**
   * The HTML element element used to render the button
   */
  component: 'a';
  /**
   * A URL to link to
   */
  href: string;
}

export type Props = (CommonBase & ButtonProps) | (CommonBase & LinkProps);

function isLink(props: Partial<Props>): props is CommonBase & LinkProps {
  return props.component === 'a';
}

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

function isButtonType(type?: string): type is ButtonType {
  return type ? ['button', 'submit', 'reset'].includes(type) : false;
}

/**
 * Buttons allow users to perform an action.
 * @see https://grapes.spendesk.design/docs/components/button
 */
export const Button = (props: Props) => {
  const {
    className,
    fit = 'content',
    iconName,
    iconPosition = 'left',
    isDisabled = false,
    isLoading = false,
    text,
    variant = 'primaryBrand',
    hasNegativeMargins = false,
    hasNoHorizontalPadding = false,
    isDropdown = false,
    ...rest
  } = props;
  const [internalIsLoading, setInternalIsLoading] = useState<boolean>(
    isLoading ?? false,
  );
  const internalIsDisabled = isDisabled || internalIsLoading;

  useEffect(() => {
    setInternalIsLoading(isLoading ?? false);
  }, [isLoading]);

  const buttonProps = {
    className: classNames(
      styles.button,
      commonStyles.ellipsis,
      fit === 'parent' && styles.parentFitButton,
      internalIsLoading && !isLink(props) && styles.loadingButton,
      variant.startsWith('tertiary') &&
        hasNegativeMargins &&
        styles.negativeMarginsButton,
      variant.startsWith('tertiary') &&
        hasNoHorizontalPadding &&
        styles.noHorizontalPaddingButton,
      className,
    ),
    ...rest,
  };

  const buttonContent = (
    <>
      {iconName && iconPosition === 'left' && (
        <Icon
          className={styles.leftButtonInnerIcon}
          size="m"
          name={iconName}
          aria-hidden="true"
        />
      )}
      {text}
      {isDropdown && (
        <Icon
          className={styles.rightButtonInnerIcon}
          size="m"
          name="chevron-down"
          aria-hidden="true"
        />
      )}
      {!isDropdown && iconName && iconPosition === 'right' && (
        <Icon
          className={styles.rightButtonInnerIcon}
          size="m"
          name={iconName}
          aria-hidden="true"
        />
      )}
    </>
  );

  function handleOnClick<T>(onClick?: React.MouseEventHandler<T>) {
    return onClick
      ? async (event: React.MouseEvent<T>) => {
          setInternalIsLoading(true);
          try {
            await onClick(event);
          } finally {
            setInternalIsLoading(false);
          }
        }
      : undefined;
  }

  if (isLink(props) && isLink(buttonProps)) {
    return (
      <a
        {...buttonProps}
        rel={props.rel}
        href={!isDisabled ? props.href : undefined}
        target={props.target}
        onClick={handleOnClick(props.onClick)}
        data-variant={variant}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      ref={props.ref}
      // Type assertion needed because our type is complex enough for TS to not be able to default "not link, so button"
      {...(buttonProps as CommonBase & ButtonProps)}
      type={isButtonType(props.type) ? props.type : 'button'}
      disabled={internalIsDisabled}
      onClick={handleOnClick(
        props.onClick as React.MouseEventHandler<HTMLButtonElement>,
      )}
      data-variant={variant}
    >
      {buttonContent}
    </button>
  );
};
