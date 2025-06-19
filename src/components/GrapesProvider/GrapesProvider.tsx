import React, { type ReactNode, useState } from 'react';

import type { TranslationDefinition } from '../../hooks/useTranslate';
import { supportInert } from '../../utils';

import { GrapesContext, type GrapesContextType } from './GrapesContext';

export type GrapesProviderProps = {
  /**
   * The content of the GrapesProvider
   */
  children: ReactNode;
  /**
   * The locale for your application as BCP 47 language tag.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc4647}
   * @example "en-US", "de-DE", "fr-FR"
   */
  locale: string;
  /**
   * The definition of locales helper to translate default Grapes text
   */
  localesDefinition: TranslationDefinition;
  /**
   * The Mapbox Access token for your application.
   * Required if you want to use a AutocompletePlace component
   */
  mapboxAccessToken?: string;
};

export const GrapesProvider = ({
  children,
  localesDefinition,
  locale,
  mapboxAccessToken,
}: GrapesProviderProps) => {
  const [inert, setInert] = useState(false);
  const context: GrapesContextType = {
    locale,
    localesDefinition,
    mapboxAccessToken,
    setInert,
  };

  return (
    <GrapesContext.Provider value={context}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore Typescript and React doesn't play nice with inert https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert*/}
      <div inert={supportInert(inert)}>{children}</div>
    </GrapesContext.Provider>
  );
};
