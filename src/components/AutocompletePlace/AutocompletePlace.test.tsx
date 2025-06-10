import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sanitizeSearchText, type MapboxPlace } from './mapbox';
import { GrapesProvider } from '../GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import { FormField } from '../FormField';
import { AutocompletePlace } from '.';
import { AutocompleteNoOptions } from '../AutocompleteNoOptions';
import { vi } from 'vitest';

const availableOptions: MapboxPlace[] = [
  {
    id: 'address.255018732464036',
    place_type: ['address'],
    text: 'Rue Des Haudriettes',
    place_name: '12 Rue Des Haudriettes, 75003 Paris, France',
    center: [2.357208, 48.861836],
    geometry: { type: 'Point', coordinates: [2.357208, 48.861836] },
    address: '12',
    context: [
      {
        id: 'neighborhood.70650957',
        text: 'Sainte-Avoie',
      },
      {
        id: 'postcode.39300685',
        text: '75003',
      },
      {
        id: 'locality.223821',
        text: '3rd arrondissement of Paris',
      },
      {
        id: 'place.894029',
        short_code: 'FR-75',
        text: 'Paris',
      },
      {
        id: 'country.8781',
        short_code: 'fr',
        text: 'France',
      },
    ],
  },
  {
    id: 'address.1823205748272846',
    place_type: ['address'],
    text: 'Rue Sainte-Croix De La Bretonnerie',
    place_name: '12 Rue Sainte-Croix De La Bretonnerie, 75004 Paris, France',
    center: [2.357028, 48.857938],
    geometry: { type: 'Point', coordinates: [2.357028, 48.857938] },
    address: '12',
    context: [
      {
        id: 'neighborhood.71683149',
        text: 'Quartier Saint-Gervais',
      },
      {
        id: 'postcode.39308877',
        text: '75004',
      },
      {
        id: 'locality.248397',
        text: '4th arrondissement of Paris',
      },
      {
        id: 'place.894029',
        short_code: 'FR-75',
        text: 'Paris',
      },
      {
        id: 'country.8781',
        short_code: 'fr',
        text: 'France',
      },
    ],
  },
  {
    id: 'address.2828725691188930',
    place_type: ['address'],
    text: 'Rue Des Rosiers',
    place_name: '12 Rue Des Rosiers, 75004 Paris, France',
    center: [2.360048, 48.856916],
    geometry: { type: 'Point', coordinates: [2.360048, 48.856916] },
    address: '12',
    context: [
      {
        id: 'neighborhood.71683149',
        text: 'Quartier Saint-Gervais',
      },
      {
        id: 'postcode.39308877',
        text: '75004',
      },
      {
        id: 'locality.248397',
        text: '4th arrondissement of Paris',
      },
      {
        id: 'place.894029',
        short_code: 'FR-75',
        text: 'Paris',
      },
      {
        id: 'country.8781',
        short_code: 'fr',
        text: 'France',
      },
    ],
  },
  {
    id: 'address.7569801944816392',
    place_type: ['address'],
    text: 'Rue Des Francs Bourgeois',
    place_name: '12 Rue Des Francs Bourgeois, 75003 Paris, France',
    center: [2.363029, 48.856903],
    geometry: { type: 'Point', coordinates: [2.363029, 48.856903] },
    address: '12',
    context: [
      {
        id: 'neighborhood.1633357',
        text: 'Quartier des Archives',
      },
      {
        id: 'postcode.39300685',
        text: '75003',
      },
      {
        id: 'locality.223821',
        text: '3rd arrondissement of Paris',
      },
      {
        id: 'place.894029',
        short_code: 'FR-75',
        text: 'Paris',
      },
      {
        id: 'country.8781',
        short_code: 'fr',
        text: 'France',
      },
    ],
  },
  {
    id: 'address.4588459841821190',
    place_type: ['address'],
    text: 'Rue Jean-Pierre Timbaud',
    place_name: '12 Rue Jean-Pierre Timbaud, 75011 Paris, France',
    center: [2.367554, 48.865059],
    geometry: { type: 'Point', coordinates: [2.367554, 48.865059] },
    address: '12',
    context: [
      {
        id: 'neighborhood.25291853',
        text: 'Quartier de la Folie-Méricourt',
      },
      {
        id: 'postcode.39366221',
        text: '75011',
      },
      {
        id: 'locality.35405',
        text: '11th arrondissement of Paris',
      },
      {
        id: 'place.894029',
        short_code: 'FR-75',
        text: 'Paris',
      },
      {
        id: 'country.8781',
        short_code: 'fr',
        text: 'France',
      },
    ],
  },
];

vi.mock('./mapbox', async (importOriginal) => {
  const originalModule = await importOriginal();

  return {
    ...(originalModule as object),
    getMatchingPlaces: () => availableOptions,
  };
});

vi.mock('../../hooks/useDebounce');

function getShortAddress(mapboxPlace: MapboxPlace) {
  return mapboxPlace.address
    ? `${mapboxPlace.address} ${mapboxPlace.text}`
    : mapboxPlace.text;
}

describe('AutocompletePlace component', () => {
  it('allows the user to start typing', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<MapboxPlace>();
      return (
        <div style={{ width: '360px' }}>
          <GrapesProvider
            locale="en-US"
            mapboxAccessToken="mapboxAccessToken"
            localesDefinition={LOCALES}
          >
            <FormField label="AutocompletePlace">
              <AutocompletePlace
                value={value ? getShortAddress(value) : undefined}
                handleSelect={(result) => {
                  if (result) {
                    setValue(result);
                  }
                }}
                renderNoOptions={(rawValue, debouncedSearchValue) => {
                  if (rawValue.length < 3 || !debouncedSearchValue) {
                    return (
                      <AutocompleteNoOptions>
                        <div>Start typing to search</div>
                      </AutocompleteNoOptions>
                    );
                  }
                  return (
                    <AutocompleteNoOptions>
                      <div>There are no results for {rawValue}</div>
                    </AutocompleteNoOptions>
                  );
                }}
              />
            </FormField>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </GrapesProvider>
        </div>
      );
    };
    render(<Wrapper />);

    await userEvent.type(screen.getByRole('combobox'), '12');

    expect(
      await screen.findByText('Start typing to search'),
    ).toBeInTheDocument();
  });

  it('allows the user to search for a place', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<MapboxPlace>();
      return (
        <div style={{ width: '360px' }}>
          <GrapesProvider
            locale="en-US"
            mapboxAccessToken="mapboxAccessToken"
            localesDefinition={LOCALES}
          >
            <FormField label="AutocompletePlace">
              <AutocompletePlace
                value={value ? getShortAddress(value) : undefined}
                handleSelect={(result) => {
                  if (result) {
                    setValue(result);
                  }
                }}
                renderNoOptions={(rawValue, debouncedSearchValue) => {
                  if (rawValue.length < 3 || !debouncedSearchValue) {
                    return (
                      <AutocompleteNoOptions>
                        <div>Start typing to search</div>
                      </AutocompleteNoOptions>
                    );
                  }
                  return (
                    <AutocompleteNoOptions>
                      <div>There are no results for {rawValue}</div>
                    </AutocompleteNoOptions>
                  );
                }}
              />
            </FormField>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </GrapesProvider>
        </div>
      );
    };
    render(<Wrapper />);

    await userEvent.type(screen.getByRole('combobox'), '12 rue');

    expect(await screen.findAllByRole('option')).toHaveLength(
      availableOptions.length,
    );

    await userEvent.click(
      screen.getByRole('option', {
        name: '12 Rue Des Haudriettes, 75003 Paris, France',
      }),
    );

    expect(screen.getByRole('combobox')).toHaveValue('12 Rue Des Haudriettes');
  });
});

describe('sanitizeSearchText', () => {
  it('should shorten the search text to 256 characters maximum', () => {
    expect(sanitizeSearchText('a'.repeat(300))).toHaveLength(256);
  });

  it('should shorten the search text when  more than 20 tokens can be found', () => {
    expect(sanitizeSearchText('a '.repeat(200))).toHaveLength(39);
  });

  it('handles empty string', () => {
    expect(sanitizeSearchText('')).toHaveLength(0);
  });
});
