import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  AutocompleteMultiple,
  type AutocompleteMultipleProps,
} from '../AutocompleteMultiple';
import { userEvent, within } from 'storybook/test';

const costCenterOptions = [
  { key: '1', label: 'Marketing' },
  { key: '2', label: 'Legal' },
  { key: '3', label: 'Office' },
  { key: '4', label: 'Platform' },
  { key: '5', label: 'Finance' },
  { key: '6', label: 'Recruitment' },
  { key: '7', label: 'Growth' },
  { key: '8', label: 'Management' },
];

const meta: Meta<typeof AutocompleteMultiple> = {
  title: 'Form/AutocompleteMultiple',
  component: AutocompleteMultiple,
  parameters: { layout: 'centered', chromatic: { disableSnapshot: false } },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: costCenterOptions,
  },
};

export default meta;

type Story = StoryObj<typeof AutocompleteMultiple>;

type Option = (typeof costCenterOptions)[number];

const DemoAutocompleteMultiple = (props: AutocompleteMultipleProps<Option>) => {
  const [options, setOptions] = useState(props.options);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  return (
    <AutocompleteMultiple
      {...props}
      placeholder="Search a cost center"
      values={selectedOptions}
      options={options}
      translations={{
        selectAll: `Select all (${
          options.flatMap((option) =>
            'options' in option ? option.options : option,
          ).length
        } cost centers)`,
        selected: `${selectedOptions.length} cost centers selected`,
      }}
      onSearch={(value) => {
        if (!value) {
          setOptions(props.options);
          return;
        }
        setOptions(
          props.options.flatMap((option) => {
            if ('options' in option) {
              return option.label.toLowerCase().includes(value.toLowerCase())
                ? option
                : {
                    ...option,
                    options: option.options.filter((subOption) =>
                      subOption.label
                        .toLowerCase()
                        .includes(value.toLowerCase()),
                    ),
                  };
            }
            return option.label.toLowerCase().includes(value.toLowerCase())
              ? option
              : [];
          }),
        );
      }}
      onSelect={setSelectedOptions}
    />
  );
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
  },
  render: DemoAutocompleteMultiple,
};

export const Disabled: Story = {
  render: Default.render,
  args: {
    isDisabled: true,
  },
};

export const Invalid: Story = {
  render: Default.render,
  args: {
    isInvalid: true,
  },
};

export const ParentFit: Story = {
  ...Default,
  args: {
    fit: 'parent',
  },
};

export const Loading: Story = {
  ...Default,
  args: {
    isLoading: true,
    fit: 'parent',
  },
};

export const WithClearSelectionButton: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.click(
      await canvas.findByRole('option', { name: 'Marketing' }),
    );
    await userEvent.click(await canvas.findByRole('option', { name: 'Legal' }));
  },
  args: {
    showClearSelectionButton: true,
    fit: 'parent',
  },
};

export const WithCustomHeight: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.click(
      await canvas.findByRole('option', { name: 'Marketing' }),
    );
    await userEvent.click(await canvas.findByRole('option', { name: 'Legal' }));
  },
  args: {
    dropdownMenuContentMaxHeight: '250px',
  },
};

const ComponentAsynchronous = () => {
  const [options, setOptions] = useState(costCenterOptions);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  return (
    <AutocompleteMultiple
      values={selectedOptions}
      options={options}
      fit="parent"
      translations={{
        selected: `${selectedOptions.length} cost centers selected`,
      }}
      onSearch={async (value) => {
        if (value === undefined || value.length === 0) {
          setOptions(costCenterOptions);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        setOptions(
          costCenterOptions.filter((option) =>
            option.label.toLowerCase().includes(value.toLowerCase()),
          ),
        );
      }}
      onSelect={setSelectedOptions}
      placeholder="Search a cost center"
    />
  );
};

export const Aynchronous = {
  render: ComponentAsynchronous,
  parameters: {
    chromatic: { disableSnapshot: true },
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
