import React, { ReactElement } from 'react';
import { classNames } from '../../utils';

import type { TimelineItemProps } from './TimelineItem';

import styles from './Timeline.module.css';
import {
  dateFormatter,
  DATE_FORMAT,
} from '../../hooks/useDateFormatter/useDateFormatter';

const defaultDateFormatter = (date: Date, locale: string) => {
  return dateFormatter(locale, date, DATE_FORMAT.LONG_WITH_TIME);
};

export type TimelineProps = {
  /**
   * The TimelineItem(s) contained within the Timeline
   */
  children: ReactElement<TimelineItemProps> | ReactElement<TimelineItemProps>[];
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
   * Function called to render date
   * @default defaultDateFormatter
   */
  renderDate?: (date: Date, locale: string) => string;
};

type Context = {
  fit: 'content' | 'parent';
  renderDate: (date: Date, locale: string) => string;
};

export const TimelineContext = React.createContext<Context | null>(null);

export const Timeline = ({
  children,
  className,
  fit = 'content',
  renderDate = defaultDateFormatter,
  ...rest
}: TimelineProps) => (
  <ul
    className={classNames(
      styles.list,
      className,
      fit === 'content' && styles.contentFit,
    )}
    {...rest}
  >
    <TimelineContext.Provider value={{ fit, renderDate }}>
      {children}
    </TimelineContext.Provider>
  </ul>
);
