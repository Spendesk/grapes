import React from 'react';
import { render, screen } from '@testing-library/react';

import { useTranslate } from '../../hooks/useTranslate';

import { GrapesProvider } from './';
import { useLocale } from './hooks/useLocale';
import { useMapboxAccessToken } from './hooks/useMapboxAccessToken';
import { LOCALES } from './exampleLocales';

const exampleLocale = LOCALES.locales.en;

describe('GrapesProvider', () => {
  it('exposes the value of the locale', () => {
    const ChildrenComponent = () => {
      const locale = useLocale();

      return <span>Locale: {locale}</span>;
    };

    render(
      <GrapesProvider locale="fr-FR" localesDefinition={LOCALES}>
        <ChildrenComponent />
      </GrapesProvider>,
    );
    expect(screen.getByText('Locale: fr-FR')).toBeVisible();
  });

  it('exposes the value of the Mapbox token', () => {
    const ChildrenComponent = () => {
      const token = useMapboxAccessToken();

      return <span>Token: {token}</span>;
    };

    render(
      <GrapesProvider
        mapboxAccessToken="Mapbox"
        locale="en-US"
        localesDefinition={LOCALES}
      >
        <ChildrenComponent />
      </GrapesProvider>,
    );
    expect(screen.getByText('Token: Mapbox')).toBeVisible();
  });

  it('accept locales to overwrite translation', () => {
    const ChildrenComponent = () => {
      const t = useTranslate();

      return <span>{t('cancel')}</span>;
    };

    render(
      <GrapesProvider
        mapboxAccessToken="Mapbox"
        locale="en"
        localesDefinition={{
          locales: {
            en: {
              ...exampleLocale,
              cancel: 'Wonderful cancel button',
            },
          },
        }}
      >
        <ChildrenComponent />
      </GrapesProvider>,
    );
    expect(screen.getByText('Wonderful cancel button')).toBeVisible();
  });

  it('accept function in locales key', () => {
    const ChildrenComponent = () => {
      const t = useTranslate();

      return <span>{t('cancel', { test: 'lala' })}</span>;
    };

    render(
      <GrapesProvider
        mapboxAccessToken="Mapbox"
        locale="en-US"
        localesDefinition={{
          ...LOCALES,
          locales: {
            en: {
              ...exampleLocale,
              cancel: (args) => `${args?.test} cancel ${args?.test}`,
            },
          },
        }}
      >
        <ChildrenComponent />
      </GrapesProvider>,
    );
    expect(screen.getByText('lala cancel lala')).toBeVisible();
  });

  it('does a fallback to the default translation', () => {
    const ChildrenComponent = () => {
      const t = useTranslate();

      return <span>{t('cancel')}</span>;
    };

    render(
      <GrapesProvider
        mapboxAccessToken="Mapbox"
        locale="en-US"
        localesDefinition={{
          fallbackLocale: 'default',
          locales: {
            default: exampleLocale,
          },
        }}
      >
        <ChildrenComponent />
      </GrapesProvider>,
    );
    expect(screen.getByText('Cancel')).toBeVisible();
  });

  it('does not throw if translation cannot be found', () => {
    const ChildrenComponent = () => {
      const t = useTranslate();

      return <span>{t('cancel')}</span>;
    };

    render(
      <GrapesProvider
        mapboxAccessToken="Mapbox"
        locale="en-US"
        localesDefinition={{
          locales: {
            'fr-FR': exampleLocale,
          },
        }}
      >
        <ChildrenComponent />
      </GrapesProvider>,
    );

    expect(screen.queryByText('Cancel default button')).not.toBeInTheDocument();
  });

  it('select the current locale ', () => {
    const ChildrenComponent = () => {
      const t = useTranslate();

      return <span>{t('cancel')}</span>;
    };

    render(
      <GrapesProvider
        mapboxAccessToken="Mapbox"
        locale="en"
        localesDefinition={{
          fallbackLocale: 'no more',
          locales: {
            en: {
              ...exampleLocale,
              cancel: 'Cancel current button',
            },
            'no more': {
              ...exampleLocale,
              cancel: 'Cancel no more button',
            },
          },
        }}
      >
        <ChildrenComponent />
      </GrapesProvider>,
    );

    expect(screen.getByText('Cancel current button')).toBeVisible();
  });
});
