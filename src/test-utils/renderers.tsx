import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import {
  GrapesProvider,
  GrapesProviderProps,
} from '../components/GrapesProvider';
import { LOCALES } from '../components/GrapesProvider/exampleLocales';

export const renderWithGrapesProvider = (
  children: React.ReactNode,
  grapesProviderProps?: Partial<GrapesProviderProps>,
): RenderResult => {
  const propsWithDefault = {
    locale: 'en',
    localesDefinition: LOCALES,
    ...grapesProviderProps,
  };
  return render(
    <GrapesProvider {...propsWithDefault}>{children}</GrapesProvider>,
  );
};
