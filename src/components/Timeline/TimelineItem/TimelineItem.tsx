import React, { type ReactNode } from 'react';

import { classNames } from '../../../utils';
import { useId } from '../../../hooks/useId';
import { useLocale } from '../../GrapesProvider';
import { useTimelineItemContext } from './useTimelineItemContext';

import styles from './TimelineItem.module.css';

export type TimelineItemProps = {
  /**
   * The element's date
   */
  date: Date;
  /**
   * Content to render
   */
  children: ReactNode;
  /**
   * Function called to render date
   */
  renderDate?: (date: Date, locale: string) => string;
};

export const TimelineItem = ({
  date,
  children,
  renderDate,
}: TimelineItemProps) => {
  const labelId = useId();
  const locale = useLocale();

  const { fit, renderDate: contextRenderDate } = useTimelineItemContext();

  return (
    <li className={styles.timelineItem} aria-labelledby={labelId}>
      <div className={styles.timelineItemSeparator} role="presentation">
        <div className={styles.timelineItemDot} />
      </div>
      <div
        className={classNames(
          styles.timelineItemContent,
          fit === 'parent' && styles.contentGrow,
        )}
      >
        <div className={styles.timelineItemDate} id={labelId}>
          {renderDate
            ? renderDate(date, locale)
            : contextRenderDate(date, locale)}
        </div>
        <div className={styles.timelineItemEvent}>{children}</div>
      </div>
    </li>
  );
};
