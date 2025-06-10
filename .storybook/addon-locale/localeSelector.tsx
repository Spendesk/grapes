import React from 'react';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from 'storybook/internal/components';
import { GlobeIcon } from '@storybook/icons';
import { useGlobals } from 'storybook/manager-api';

const ITEMS = [
  { title: 'English (US)', value: 'en-US', right: '🇺🇸' },
  { title: 'English (UK)', value: 'en-GB', right: '🇬🇧' },
  { title: 'Français', value: 'fr-FR', right: '🇫🇷' },
  { title: 'Deutch', value: 'de-DE', right: '🇩🇪' },
  { title: 'Italiano', value: 'it-IT', right: '🇮🇹' },
  { title: 'Español', value: 'es-ES', right: '🇪🇸' },
  { title: 'Divehi (Maldives)', value: 'dv-MV', right: '🇲🇻' },
];
function getItem(onClick, title, right, value, selectedValue) {
  return {
    id: value,
    title,
    onClick,
    right,
    active: selectedValue === value,
  };
}

export function LocaleSelector() {
  const [globals, updateGlobals] = useGlobals();
  const localeChosen = globals['locale'];

  function handleClick(locale) {
    updateGlobals({ locale });
  }

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={ITEMS.map((item) =>
            getItem(
              () => {
                handleClick(item.value);
                onHide();
              },
              item.title,
              item.right,
              item.value,
              localeChosen,
            ),
          )}
        />
      )}
    >
      <IconButton
        key="background"
        title="Internationalization locale"
        active={false}
      >
        <GlobeIcon />
      </IconButton>
    </WithTooltip>
  );
}
