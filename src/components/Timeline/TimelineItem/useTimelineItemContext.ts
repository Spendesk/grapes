import { useContext } from 'react';

import { TimelineContext } from '../Timeline';

export function useTimelineItemContext() {
  const timelineContext = useContext(TimelineContext);

  if (timelineContext === null) {
    throw new Error(
      'useTimelineItemContext should be within a TimelineContext',
    );
  }

  return {
    fit: timelineContext.fit,
    renderDate: timelineContext.renderDate,
  };
}
