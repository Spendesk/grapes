/**
 * Given a function to group, group the given data.
 * This function prioritizes speed over readability.
 */
export function groupByFn<T>(options: T[], groupBy?: (row: T) => string) {
  if (!groupBy) {
    return options;
  }

  const groupedOptions: Record<string, T[]> = {};
  for (let i = 0; i < options.length; i++) {
    const key = groupBy(options[i]);
    if (groupedOptions[key]) {
      groupedOptions[key].push(options[i]);
    } else {
      groupedOptions[key] = [options[i]];
    }
  }
  return groupedOptions;
}

export function getEnabledOptionIds<T>(
  options: T[],
  getOptionId: (option: T) => string,
  getIsOptionDisabled?: (option: T) => boolean,
  getIsOptionCheckable?: (option: T) => boolean,
) {
  return options.reduce((enabledOptions, option) => {
    if (
      (getIsOptionDisabled && getIsOptionDisabled(option)) ||
      (getIsOptionCheckable && !getIsOptionCheckable(option))
    ) {
      return enabledOptions;
    }
    enabledOptions.push(getOptionId(option));
    return enabledOptions;
  }, [] as string[]);
}

export type DirectionKey = 'ArrowUp' | 'ArrowDown' | 'Home' | 'End';
export function getIndexFromDirectionKey(
  currentIndex: number,
  directionKey: DirectionKey,
  maxIndex: number,
) {
  switch (directionKey) {
    case 'ArrowUp':
      return Math.max(currentIndex - 1, 0);
    case 'ArrowDown':
      return Math.min(currentIndex + 1, maxIndex);
    case 'Home':
      return 0;
    case 'End':
      return maxIndex;
  }
}
