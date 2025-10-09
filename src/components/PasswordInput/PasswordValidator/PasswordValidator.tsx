import React from 'react';
import { Icon } from '../../Icon';
import type { PasswordRule } from '../passwordRule';
import styles from './PasswordValidator.module.css';
import { classNames } from '../../../utils';

type Props = {
  password: string | null;
  rules: PasswordRule[];
};

export const PasswordValidator = ({ password, rules }: Props) => {
  return (
    <div
      className={classNames(
        styles.rulesContainer,
        getRulesContainerClassName(password, rules),
      )}
    >
      {rules.map((rule) => {
        const isRuleValid = !!password && rule.validate(password);
        const isNotEmpty = !!password && password.length > 0;
        const iconName =
          isNotEmpty && !isRuleValid ? 'hexagone-cross' : 'circle-check';

        return (
          <div
            key={rule.label}
            className={classNames(
              styles.rule,
              isNotEmpty &&
                (isRuleValid ? styles.ruleIsValid : styles.ruleIsInvalid),
            )}
          >
            <Icon className={styles.ruleIcon} size="s" name={iconName} />
            {rule.required !== undefined
              ? `${rule.required} ${rule.label}`
              : rule.label}
          </div>
        );
      })}
    </div>
  );
};

function getRulesContainerClassName(
  password: string | null,
  rules: PasswordRule[],
): string {
  if (
    rules.some((rule) => {
      const isRuleValid = !!password && rule.validate(password);
      const isNotEmpty = !!password && password.length > 0;
      return isNotEmpty && !isRuleValid;
    })
  ) {
    return styles.rulesContainerInvalid;
  }

  if (
    rules.every((rule) => {
      const isRuleValid = !!password && rule.validate(password);
      const isNotEmpty = !!password && password.length > 0;
      return isNotEmpty && isRuleValid;
    })
  ) {
    return styles.rulesContainerValid;
  }

  return '';
}
