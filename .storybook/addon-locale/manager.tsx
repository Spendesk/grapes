import React from 'react';

import { addons, types } from 'storybook/manager-api';
import { LocaleSelector } from './localeSelector';

const ADDON_ID = 'addon-locale';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    title: 'Locale',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <LocaleSelector />,
  });
});
