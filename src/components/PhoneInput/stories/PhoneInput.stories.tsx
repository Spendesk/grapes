/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import {
  type CountryCode,
  getCountryCallingCode,
  formatIncompletePhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js';

import { PhoneInput } from '../PhoneInput';
import { COUNTRIES } from './country';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof PhoneInput> = {
  title: 'Form/PhoneInput',
  component: PhoneInput,
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

const formatPhoneNumber = (value: string | null, country: string) => {
  if (!value) {
    return '';
  }
  const formattedPhoneNumber = formatIncompletePhoneNumber(
    value.replace(/\s/g, ''),
    country as CountryCode,
  );
  const callingCode = getCountryCallingCode(country as CountryCode);
  if (formattedPhoneNumber === `+${callingCode}`) {
    return '';
  }
  return formattedPhoneNumber.replace(`+${callingCode} `, '');
};

export const Default: Story = {
  args: {
    formatPhoneNumber,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [country, setCountry] = useState<CountryCode>('FR');
    return (
      <div style={{ width: '360px' }}>
        <PhoneInput
          {...args}
          value={value}
          callingCode={getCountryCallingCode(country)}
          country={country}
          countries={Object.entries(COUNTRIES).map(
            ([countryCode, countryName]) => ({
              key: countryCode,
              label: countryName,
            }),
          )}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          onSelectCountry={(selectedCountry) => {
            setCountry(selectedCountry.key as CountryCode);
            setValue('');
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    formatPhoneNumber,
    isDisabled: true,
  },
  parameters: {
    layout: 'centered',
  },
  render: Default.render,
};

export const Prefilled: Story = {
  args: {
    formatPhoneNumber,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [country, setCountry] = useState<CountryCode>('FR');
    useEffect(() => {
      try {
        const { country: parsedCountry, number } =
          parsePhoneNumber('+12345678912');
        if (parsedCountry) {
          setCountry(parsedCountry);
        }
        setValue(number);
      } catch (error) {
        console.error(error);
      }
    }, []);
    return (
      <div style={{ width: '360px' }}>
        <PhoneInput
          {...args}
          value={value}
          callingCode={getCountryCallingCode(country)}
          country={country}
          countries={Object.entries(COUNTRIES).map(
            ([countryCode, countryName]) => ({
              key: countryCode,
              label: countryName,
            }),
          )}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          onSelectCountry={(selectedCountry) => {
            setCountry(selectedCountry.key as CountryCode);
            setValue('');
          }}
        />
      </div>
    );
  },
};

export const PrefilledAndDisabled: Story = {
  args: {
    formatPhoneNumber,
    isDisabled: true,
  },
  parameters: {
    layout: 'centered',
  },
  render: Prefilled.render,
};

export const PrefilledAndInADisabledFieldset: Story = {
  args: {
    formatPhoneNumber,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [country, setCountry] = useState<CountryCode>('FR');
    useEffect(() => {
      try {
        const { country: parsedCountry, number } =
          parsePhoneNumber('+12345678912');
        if (parsedCountry) {
          setCountry(parsedCountry);
        }
        setValue(number);
      } catch (error) {
        console.error(error);
      }
    }, []);
    return (
      <div style={{ width: '360px' }}>
        <fieldset disabled>
          <PhoneInput
            {...args}
            value={value}
            callingCode={getCountryCallingCode(country)}
            country={country}
            countries={Object.entries(COUNTRIES).map(
              ([countryCode, countryName]) => ({
                key: countryCode,
                label: countryName,
              }),
            )}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            onSelectCountry={(selectedCountry) => {
              setCountry(selectedCountry.key as CountryCode);
              setValue('');
            }}
          />
        </fieldset>
      </div>
    );
  },
};

export const ParentFit: Story = {
  args: {
    formatPhoneNumber,
    fit: 'parent',
  },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [country, setCountry] = useState<CountryCode>('FR');
    return (
      <PhoneInput
        {...args}
        value={value}
        callingCode={getCountryCallingCode(country)}
        country={country}
        countries={Object.entries(COUNTRIES).map(
          ([countryCode, countryName]) => ({
            key: countryCode,
            label: countryName,
          }),
        )}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onSelectCountry={(selectedCountry) => {
          setCountry(selectedCountry.key as CountryCode);
          setValue('');
        }}
      />
    );
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        Disabled,
        Prefilled,
        PrefilledAndInADisabledFieldset,
        ParentFit,
      ]}
      meta={meta}
    />
  ),
};
