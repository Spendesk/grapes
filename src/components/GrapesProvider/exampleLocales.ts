import type { TranslationDefinition } from '../../hooks/useTranslate';

export const LOCALES: TranslationDefinition = {
  fallbackLocale: 'en',
  locales: {
    en: {
      cancel: 'Cancel',
      close: 'Close',
      nextMonth: 'Next month',
      previousMonth: 'Previous month',
      openCalendar: 'Open calendar',
      show: 'show',
      hide: 'hide',
      showOptions: 'Show options',
      edit: 'Edit',
      clearSelection: 'Clear selection',
      selectCurrency: 'Select currency',
      deleteWithName: ({ name }) => `Delete ${name}`,
    },
  },
};
