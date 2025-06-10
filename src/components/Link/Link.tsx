import React, { createElement } from 'react';
import { classNames, type PropsOf, type As } from '../../utils';
import styles from './Anchor.module.css';

import { Anchor, AnchorProps } from './Anchor';

export type LinkProps<T extends As> = PropsOf<T> | AnchorProps;

function isCustomElement<T extends As>(
  props: LinkProps<T>,
): props is PropsOf<T> {
  return 'as' in props;
}

export function Link<T extends React.ElementType>(props: LinkProps<T>) {
  if (isCustomElement(props)) {
    const { as: Component, className, ...rest } = props;
    return createElement(Component, {
      ...rest,
      className: classNames(styles.anchor, className),
    });
  }

  return createElement(Anchor, props);
}
