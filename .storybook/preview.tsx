import React from 'react';

import type { Preview } from '@storybook/react';
import { GrapesProvider } from '../src/components/GrapesProvider';
import { LOCALES } from '../src/components/GrapesProvider/exampleLocales';

import './styles.scss';
import '../src/tailwind.css';

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
  decorators: [withMargin, withProvider],
  parameters: {
    options: {
      storySort: {
        order: ['Welcome', 'Application', 'Interaction', 'Form', 'Feedback'],
      },
    },
    chromatic: {
      disableSnapshot: true,
    },
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
