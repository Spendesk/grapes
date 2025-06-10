import { createContext } from 'react';

import type { TranslationDefinition } from '../../hooks/useTranslate';

export type GrapesContextType = {
  locale: string;
  localesDefinition: TranslationDefinition;
  mapboxAccessToken?: string;
  userCountry?: string;
  setInert?: (inert: boolean) => void;
};

export const GrapesContext = createContext<GrapesContextType>({
  locale: 'en-us',
  localesDefinition: {
    fallbackLocale: undefined,
    locales: {},
  },
  mapboxAccessToken: undefined,
  userCountry: undefined,
  setInert: undefined,
});
