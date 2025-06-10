import { getDateInRange } from '../../DatePicker/utils';
import type { DateRange } from '../CalendarRange';

export function isBetween(date: Date, range: DateRange) {
  const [start, end] = range;
  if (start === undefined || end === undefined) {
    return false;
  }
  const refDate = getDateInRange(date, start, end);
  return refDate === date;
}
