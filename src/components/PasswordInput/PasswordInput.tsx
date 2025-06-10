import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useState,
} from 'react';
import { classNames } from '../../utils';

import { Input } from '../Input';

import styles from './PasswordInput.module.scss';
import { IconButton } from '../IconButton';
import { useTranslate } from '../../hooks/useTranslate';
import { PasswordRule } from './passwordRule';
import { PasswordValidator } from './PasswordValidator/PasswordValidator';
import { colors } from '../../colors';

export type PasswordInputProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The rules to apply.
   */
  rules?: PasswordRule[];
  /**
   * Whether the PasswordInput should fit its parent or content.
   * @default content
   */
  fit?: 'content' | 'parent';
  /**
   * The id of the PasswordInput.
   */
  id?: string;
  /**
   * Whether the Input should be disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The name of the PasswordInput, used when submitting an HTML form.
   */
  name?: string;
  /**
   * Temporary text that occupies the PasswordInput when it is empty.
   */
  placeholder?: string;
  /**
   * The current value
   */
  value: string | null;
  /**
   * Handler that is called when the value changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the input receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when the input loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler that is called when a key is pressed.
   */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export const PasswordInput = /*@__PURE__*/ forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      rules = [],
      fit = 'content',
      id,
      isDisabled,
      name,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const t = useTranslate();

    const areAllPasswordRulesValid = (
      password: string,
      rules: PasswordRule[],
    ) => {
      return rules.every((rule) => !!rule.validate(password));
    };

    return (
      <div
        className={classNames(
          styles.passwordInputWrapper,
          fit === 'parent' && styles.parentFitPasswordInputWrapper,
          className,
        )}
      >
        <Input
          {...rest}
          autoComplete={rules.length ? 'new-password' : 'current-password'}
          fit={fit}
          id={id}
          name={name}
          ref={ref}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isInvalid={!!value && !areAllPasswordRulesValid(value, rules)}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          type={isPasswordVisible ? 'text' : 'password'}
          value={value ?? ''}
          rightAddon={
            <IconButton
              iconName="eye"
              iconColor={colors.contentSecondaryBgPrimary}
              aria-label={isPasswordVisible ? t('hide') : t('show')}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              isDisabled={isDisabled}
            />
          }
        />
        {rules?.length > 0 && (
          <PasswordValidator rules={rules} password={value} />
        )}
      </div>
    );
  },
);
