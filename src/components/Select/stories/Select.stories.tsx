/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';
import React, { useState } from 'react';

import { DropdownItem } from '../../DropdownItem';
import { Select } from '../Select';
import type { Option } from '../option';
import { AutocompleteNoOptions } from '../../AutocompleteNoOptions';

type CostCenter = Option & {
  owner: string;
};

const costCenters: CostCenter[] = [
  {
    key: 'marketing',
    label: 'Marketing',
    owner: 'Michael Murphy',
  },
  {
    key: 'legal',
    label: 'Legal',
    owner: 'Nayden Lennart',
  },
  {
    key: 'office',
    label: 'Office',
    owner: 'Nicolas Harvey',
  },
  {
    key: 'platform',
    label: 'Platform',
    owner: 'Lewis Barker',
  },
  {
    key: 'finance',
    label: 'Finance',
    owner: 'George Gray',
  },
  {
    key: 'recruitment',
    label: 'Recruitment',
    owner: 'Laura Lagarde',
  },
];

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Select a cost center',
    options: costCenters,
    fit: 'parent',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    fit: 'content',
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<Option>();
    return (
      <Select {...args} value={selectedOption} onSelect={setSelectedOption} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('button');
    await userEvent.click(combobox);
  },
};

export const ParentFit: Story = {
  ...Default,
  args: {
    fit: 'parent',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: Default.render,
};

export const InADisabledFieldset: Story = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<Option>();
    return (
      <fieldset disabled>
        <Select {...args} value={selectedOption} onSelect={setSelectedOption} />
      </fieldset>
    );
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
  render: Default.render,
};

export const WithCustomMaxHeight: Story = {
  ...Default,
  args: {
    dropdownContentMaxHeight: '264px',
  },
};

export const WithCustomOptionRenderer: Story = {
  ...Default,
  args: {
    renderOption: (option: CostCenter, optionState) => {
      return (
        <DropdownItem
          label={
            <>
              {option.label} ({option.owner})
            </>
          }
          {...optionState}
        />
      );
    },
  },
};

export const WithSearchBar: Story = {
  ...Default,
  args: {
    hasSearchBar: true,
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<Option>();
    const [options, setOptions] = useState<Option[]>(costCenters);

    return (
      <Select
        {...args}
        options={options}
        value={selectedOption}
        onSelect={setSelectedOption}
        searchPlaceholder="Search a cost center"
        onSearch={(q) => {
          if (!q) {
            setOptions(costCenters);
            return;
          }
          const lower = q.toLowerCase();
          setOptions(
            costCenters.filter((o) => o.label.toLowerCase().includes(lower)),
          );
        }}
        renderNoOptions={(rawValue) => (
          <AutocompleteNoOptions>
            <div>There are no results for {rawValue}</div>
          </AutocompleteNoOptions>
        )}
      />
    );
  },
};

export const WithGroups: Story = {
  ...Default,
  args: {
    options: [
      {
        key: 'mickael-murphy',
        label: 'Mickael Murphy',
        options: [
          {
            key: 'marketing',
            label: 'Marketing',
          },
          {
            key: 'legal',
            label: 'Legal',
          },
        ],
      },
      {
        key: 'nicolas-harvey',
        label: 'Nicolas Harvey',
        options: [
          {
            key: 'office',
            label: 'Office',
          },
          {
            key: 'platform',
            label: 'Platform',
          },
        ],
      },
      {
        key: 'george-gray',
        label: 'George Gray',
        options: [
          {
            key: 'finance',
            label: 'Finance',
          },
        ],
      },
      {
        key: 'laura-lagarde',
        label: 'Laura Lagarde',
        options: [
          {
            key: 'recruitment',
            label: 'Recruitment',
          },
        ],
      },
    ],
  },
};
