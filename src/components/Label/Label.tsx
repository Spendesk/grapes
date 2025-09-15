import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import { InfoTip } from '../InfoTip';

import styles from './Label.module.css';
import commonStyles from '../../theme/placeholders/common.module.css';

export type LabelProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Whether the label fit the content or the parent.
   * @default content
   */
  fit?: 'parent' | 'content';
  /**
   * The content to display in the tooltip near the label
   */
  infoTipContent?: ReactNode;
  /**
   * Content to render as additionnal information
   * on the right side of the label
   */
  hint?: ReactNode;
  /**
   * ID associated with the label
   */
  htmlFor?: string;
  /**
   * The element's unique identifier
   */
  id?: string;
  /**
   * The text to display as the label
   */
  label: string;
  /**
   * Whether the label should be visually hidden
   * @default false
   */
  visuallyHideLabel?: boolean;
};

export const Label = ({
  className,
  fit = 'content',
  id,
  hint,
  htmlFor,
  infoTipContent,
  label,
  visuallyHideLabel = false,
  ...rest
}: LabelProps) => {
  return (
    <div
      className={classNames(
        styles.labelContainer,
        fit === 'parent' && !visuallyHideLabel && styles.parentFitLabel,
        visuallyHideLabel && commonStyles.visuallyHidden,
        className,
      )}
    >
      <label htmlFor={htmlFor} id={id} {...rest}>
        {label}
      </label>
      {infoTipContent && <InfoTip content={infoTipContent} />}
      {hint && <span>{hint}</span>}
    </div>
  );
};
