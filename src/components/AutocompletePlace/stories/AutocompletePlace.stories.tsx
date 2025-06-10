/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { AutocompletePlace } from '../AutocompletePlace';
import { AutocompleteNoOptions } from '../../AutocompleteNoOptions';
import { Autocomplete } from '../../Autocomplete';
import { Callout } from '../../Callout';
import { TextInput } from '../../TextInput/TextInput';
import { GrapesProvider } from '../../GrapesProvider/GrapesProvider';
import { FormField } from '../../FormField/FormField';
import { LOCALES } from '../../GrapesProvider/exampleLocales';
import { MapboxPlace } from '../mapbox';
import { COUNTRIES } from './country';
import { Option } from '../../Autocomplete/option';

const meta: Meta<typeof AutocompletePlace> = {
  title: 'Form/AutocompletePlace',
  component: AutocompletePlace,
  args: {
    fit: 'parent',
    renderNoOptions: (rawValue, debouncedSearchValue) => {
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
    },
  },
};

export default meta;
type Story = StoryObj<typeof AutocompletePlace>;

function getShortAddress(mapboxPlace: MapboxPlace) {
  return mapboxPlace.address
    ? `${mapboxPlace.address} ${mapboxPlace.text}`
    : mapboxPlace.text;
}

const MapboxToken = ({
  token,
  setToken,
}: {
  token: string;
  setToken: (token: string) => void;
}) => {
  return (
    <>
      <Callout
        variant="info"
        title="A Mapbox access token needs to be passed to the GrapesProvider to use this input."
      />
      <div style={{ margin: '24px 0' }}>
        <FormField label="Mapbox Token">
          <TextInput
            placeholder="Enter mapbox token"
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
        </FormField>
      </div>
    </>
  );
};

const countries = Object.entries(COUNTRIES).map(
  ([countryCode, countryName]) => ({
    key: countryCode,
    label: countryName,
  }),
);

const CountryAutocomplete = ({
  label,
  country,
  setCountry,
}: {
  label: string;
  country: Option | undefined;
  setCountry: (country: Option | undefined) => void;
}) => {
  const [options, setOptions] = useState(countries);
  return (
    <div style={{ margin: '24px 0' }}>
      <FormField label={label}>
        <Autocomplete
          fit="parent"
          placeholder="Select country"
          value={country}
          options={options}
          onSearch={(value) => {
            if (!value) {
              setOptions(countries);
              return;
            }
            setOptions(
              countries.filter((country) =>
                country.label.toLowerCase().includes(value.toLowerCase()),
              ),
            );
          }}
          onSelect={(option) => setCountry(option)}
        />
      </FormField>
    </div>
  );
};

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<MapboxPlace>();
    const [token, setToken] = useState('');
    const [country, setCountry] = useState<Option>();
    const [proximityCountry, setProximityCountry] = useState<Option>();

    return (
      <div style={{ width: '360px' }}>
        <GrapesProvider
          locale="en-US"
          mapboxAccessToken={token}
          localesDefinition={LOCALES}
        >
          <MapboxToken token={token} setToken={setToken} />
          <CountryAutocomplete
            label="Country"
            country={country}
            setCountry={setCountry}
          />
          <CountryAutocomplete
            label="Proximity Country"
            country={proximityCountry}
            setCountry={setProximityCountry}
          />
          <FormField label="AutocompletePlace">
            <AutocompletePlace
              {...args}
              value={value ? getShortAddress(value) : undefined}
              country={country?.key}
              proximityCountry={proximityCountry?.key}
              handleSelect={(result) => {
                if (result) {
                  setValue(result);
                }
              }}
            />
          </FormField>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </GrapesProvider>
      </div>
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('51 Rue de Londres');
    const [token, setToken] = useState('');
    const [country, setCountry] = useState<Option>();
    const [proximityCountry, setProximityCountry] = useState<Option>();

    return (
      <div style={{ width: '360px' }}>
        <GrapesProvider
          locale="en-US"
          mapboxAccessToken={token}
          localesDefinition={LOCALES}
        >
          <MapboxToken token={token} setToken={setToken} />
          <CountryAutocomplete
            label="Country"
            country={country}
            setCountry={setCountry}
          />
          <CountryAutocomplete
            label="Proximity Country"
            country={proximityCountry}
            setCountry={setProximityCountry}
          />
          <FormField label="AutocompletePlace">
            <AutocompletePlace
              {...args}
              value={value}
              country={country?.key}
              proximityCountry={proximityCountry?.key}
              handleSelect={(result) => {
                if (result) {
                  setValue(getShortAddress(result));
                }
              }}
            />
          </FormField>
        </GrapesProvider>
      </div>
    );
  },
};
