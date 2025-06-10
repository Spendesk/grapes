import { useContext } from 'react';

import { GrapesContext } from '../components/GrapesProvider/GrapesContext';
import { debugWarning } from '../utils';

type TranslationKey =
  | 'cancel'
  | 'close'
  | 'nextMonth'
  | 'previousMonth'
  | 'showOptions'
  | 'openCalendar'
  | 'show'
  | 'hide'
  | 'edit'
  | 'clearSelection'
  | 'selectCurrency'
  | 'deleteWithName';

type Translation = string | ((args: { [x: string]: string }) => string);

export type TranslationDefinition = {
  /**
   * Mapping of localized strings
   */
  locales: Record<string, Record<TranslationKey, Translation>>;
  /**
   * The fallback locale to use if no translation mapping can be found using the locale
   */
  fallbackLocale?: string;
};

const applyTranslation = (
  translation: Translation,
  params?: { [key in string]: string },
): string => {
  return typeof translation === 'function'
    ? translation(params as unknown as { [x: string]: string })
    : translation;
};

export function useTranslate(): (
  key: TranslationKey,
  params?: { [key in string]: string },
) => string {
  const { localesDefinition, locale } = useContext(GrapesContext);

  return (
    key: TranslationKey,
    params?: { [key in string]: string },
  ): string => {
    if (!localesDefinition.locales) {
      debugWarning(`Can't find locales record definition`);
      return '';
    }

    const { locales, fallbackLocale } = localesDefinition;
    const defaultLocale = fallbackLocale ? locales[fallbackLocale] : undefined;
    const usableLocale = locales[locale] ? locales[locale] : defaultLocale;

    if (!usableLocale || !usableLocale[key]) {
      debugWarning(
        `Can't find translation for key ${key} using locale ${usableLocale}`,
      );
      return '';
    }
    return applyTranslation(usableLocale[key], params);
  };
}
