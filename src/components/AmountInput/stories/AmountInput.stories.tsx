/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { AmountInput } from '../AmountInput';
import { Icon } from '../../Icon';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';
import { FormField } from '../../FormField';
import { LOCALES } from '../../GrapesProvider/exampleLocales';
import { GrapesProvider } from '../../GrapesProvider';

const currencies = [
  { key: 'EUR', label: '€ - Euro' },
  {
    key: 'GBP',
    label: '£ - British Pound',
  },
  {
    key: 'USD',
    label: '$ - US Dollar',
  },
  { key: 'JPY', label: '¥ - Yen' },
];

const meta: Meta<typeof AmountInput> = {
  title: 'Form/AmountInput',
  component: AmountInput,
  args: {
    currency: currencies[0],
  },
};

export default meta;
type Story = StoryObj<typeof AmountInput>;

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    return (
      <div style={{ width: 400 }}>
        <FormField label="Amount input">
          <AmountInput
            {...args}
            value={selectedValue}
            onChange={(_, newValue) => {
              setSelectedValue(newValue);
            }}
          />
        </FormField>
      </div>
    );
  },
};
export const ParentFit: Story = {
  args: {
    fit: 'parent',
  },
  render: Default.render,
};
export const MagicGradient: Story = {
  args: {
    variant: 'magicGradient',
  },
  render: Default.render,
};
export const WithLeftAddon: Story = {
  args: {
    leftAddon: (
      <div style={{ marginLeft: '8px', marginTop: '4px' }}>
        <Icon name="robot" aria-label="Robot" />
      </div>
    ),
  },
  render: Default.render,
};
export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: Default.render,
};
export const InADisabledFieldset: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    return (
      <div style={{ width: 400 }}>
        <fieldset disabled>
          <FormField label="Amount input">
            <AmountInput
              {...args}
              value={selectedValue}
              onChange={(_, newValue) => {
                setSelectedValue(newValue);
              }}
            />
          </FormField>
        </fieldset>
      </div>
    );
  },
};
export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
  render: Default.render,
};
export const NegativeValueAllowed: Story = {
  args: {
    hasNegativeValueAllowed: true,
  },
  render: Default.render,
};
export const EditableCurrency: Story = {
  render: (args) => {
    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState(currencies[0]);
    return (
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <FormField label="Amount input">
          <AmountInput
            {...args}
            onChange={(_, newValue) => {
              setAmount(newValue);
            }}
            value={amount}
            currency={currency}
            currencies={currencies}
            onSelectCurrency={(selectedCurrency) => {
              setCurrency(selectedCurrency);
            }}
          />
        </FormField>
      </GrapesProvider>
    );
  },
};
export const DisabledEditableCurrency: Story = {
  render: (args) => {
    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState(currencies[0]);
    return (
      <FormField label="Amount input">
        <AmountInput
          {...args}
          isDisabled
          onChange={(event) => {
            setAmount(event.target.valueAsNumber);
          }}
          value={amount}
          currency={currency}
          currencies={currencies}
          onSelectCurrency={(selectedCurrency) => {
            setCurrency(selectedCurrency);
          }}
        />
      </FormField>
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
        ParentFit,
        MagicGradient,
        WithLeftAddon,
        Disabled,
        InADisabledFieldset,
        Invalid,
        NegativeValueAllowed,
        EditableCurrency,
        DisabledEditableCurrency,
      ]}
      meta={meta}
    />
  ),
};
