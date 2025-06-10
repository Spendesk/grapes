export function isSameDay(dateA?: Date, dateB?: Date): boolean {
  if (!dateA || !dateB) {
    return false;
  }
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function harmonizeTime(date: Date) {
  const dayDate = new Date(date);
  dayDate.setHours(0, 0, 0);
  return dayDate;
}
export function isDayAfter(refDate?: Date, date?: Date): boolean {
  if (!refDate || !date) {
    return false;
  }

  const dayRefDate = harmonizeTime(refDate);
  const dayDate = harmonizeTime(date);

  return dayRefDate.getTime() < dayDate.getTime();
}

export function isDayBefore(refDate?: Date, date?: Date): boolean {
  if (!refDate || !date) {
    return false;
  }

  const dayRefDate = harmonizeTime(refDate);
  const dayDate = harmonizeTime(date);

  return dayRefDate.getTime() > dayDate.getTime();
}

/**
 * Returns a date between minDate and maxDate.
 * If refDate is between minDate and maxDate, returns refDate
 * If refDate is earlier than minDate, returns minDate
 * if refDate is older than maxDate, returns maxDate
 */
export function getDateInRange(
  refDate: Date,
  minDate?: Date,
  maxDate?: Date,
): Date {
  const isDateBefore = isDayBefore(minDate, refDate);
  if (isDateBefore && minDate) {
    return minDate;
  }
  const isDateAfter = isDayAfter(maxDate, refDate);
  if (isDateAfter && maxDate) {
    return maxDate;
  }
  return refDate;
}
