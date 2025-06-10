/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { OptionGroup } from '../OptionGroup';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof OptionGroup> = {
  title: 'Form/OptionGroup',
  args: {
    name: 'optionGroupField',
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'yearly', label: 'Yearly' },
    ],
  },
  component: OptionGroup,
};

export default meta;
type Story = StoryObj<typeof OptionGroup>;

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('weekly');
    return (
      <div style={{ width: 400 }}>
        <OptionGroup
          {...args}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        />
      </div>
    );
  },
};

export const WithBooleanValues: Story = {
  args: {
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<boolean | null>(null);
    return (
      <div style={{ width: 400 }}>
        <OptionGroup
          {...args}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value === 'true');
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('yearly');
    return (
      <div style={{ width: 400 }}>
        <OptionGroup
          {...args}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        />
      </div>
    );
  },
};

export const InADisabledFieldset: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('yearly');
    return (
      <div style={{ width: 400 }}>
        <fieldset disabled>
          <OptionGroup
            {...args}
            value={selectedValue}
            onChange={(event) => {
              setSelectedValue(event.target.value);
            }}
          />
        </fieldset>
      </div>
    );
  },
};

export const InvalidAndEmpty: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    return (
      <div style={{ width: 400, margin: '10px' }}>
        <OptionGroup
          {...args}
          isInvalid={selectedValue === null}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        />
      </div>
    );
  },
};

export const InvalidChoice: Story = {
  args: {
    isInvalid: true,
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('weekly');
    return (
      <div style={{ width: 400, margin: '10px' }}>
        <OptionGroup
          {...args}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('weekly');
    return (
      <div style={{ width: 400 }}>
        <OptionGroup
          {...args}
          options={[
            { value: 'bike', label: 'Bike', iconName: 'bike' },
            { value: 'car', label: 'Car', iconName: 'car' },
            { value: 'airplane', label: 'Airplane', iconName: 'plane' },
          ]}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        />
      </div>
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
        WithBooleanValues,
        Disabled,
        InADisabledFieldset,
        InvalidAndEmpty,
        InvalidChoice,
        WithIcons,
      ]}
      meta={meta}
    />
  ),
};
