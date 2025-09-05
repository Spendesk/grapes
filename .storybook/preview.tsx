import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import { GrapesProvider } from '../src/components/GrapesProvider';
import { LOCALES } from '../src/components/GrapesProvider/exampleLocales';
import { allModes } from './modes';

import './styles.css';

/**
 * Manually import CSS variable as we don't use the entry point
 * of Grapes in the Storybook
 */
import '../src/theme/exports/css-variables.scss';

const withMargin = (Story) => {
  const hideFocusRing = process.env.IS_CHROMATIC
    ? { ['--focus-ring']: '0px solid transparent' }
    : {};

  return (
    <div style={{ margin: '24px', ...hideFocusRing }}>
      <Story />
    </div>
  );
};

const withProvider = (Story, { globals: { locale = 'en-US' } }) => (
  <GrapesProvider locale={locale} localesDefinition={LOCALES}>
    <Story />
  </GrapesProvider>
);

const preview: Preview = {
  decorators: [
    withMargin,
    withProvider,
    withThemeByDataAttribute({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Welcome', 'Application', 'Interaction', 'Form', 'Feedback'],
      },
    },
    chromatic: {
      disableSnapshot: true,
      modes: {
        light: allModes.light,
        dark: allModes.dark,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#303232' },
        light: { name: 'Light', value: '#fff' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en-US',
    },
  },
};

export default preview;
