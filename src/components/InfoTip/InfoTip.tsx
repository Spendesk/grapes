import React, { ReactNode } from 'react';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

import { colors } from '../../colors';

export type InfoTipProps = {
  /**
   * className for the element.
   */
  className?: string;
  /**
   * The content of the tooltip.
   */
  content: ReactNode;
};

export const InfoTip = ({ className, content, ...rest }: InfoTipProps) => {
  return (
    <Tooltip content={content} placement="top" triggerAsChild>
      <Icon
        className={className}
        name="circle-information"
        size="s"
        color={colors.contentDecorativeIcon}
        {...rest}
      />
    </Tooltip>
  );
};
