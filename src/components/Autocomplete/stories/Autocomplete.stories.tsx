import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';

import React, { useRef, useState } from 'react';

import { Autocomplete, type Props } from '../';
import { Avatar } from '../../Avatar';
import { AutocompleteNoOptions } from '../../AutocompleteNoOptions';
import { DropdownItem } from '../../DropdownItem';

type CostCenterOptions = { key: string; label: string };
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

const meta: Meta<typeof Autocomplete> = {
  title: 'Form/Autocomplete',
  component: Autocomplete,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  args: {
    options: costCenterOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const Template = (props: Props<CostCenterOptions>) => {
  const [options, setOptions] = useState(props.options);
  const [selectedOption, setSelectedOption] = useState<
    CostCenterOptions | undefined
  >();
  return (
    <Autocomplete
      {...props}
      value={selectedOption}
      options={options}
      renderNoOptions={(rawValue) => (
        <AutocompleteNoOptions>
          There are no results for {rawValue}
        </AutocompleteNoOptions>
      )}
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
      onSelect={setSelectedOption}
      placeholder="Search a cost center"
    />
  );
};

const TemplateWithAddOption = (props: Props<CostCenterOptions>) => {
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [options, setOptions] =
    useState<CostCenterOptions[]>(costCenterOptions);
  const [selectedOption, setSelectedOption] = useState<
    CostCenterOptions | undefined
  >();

  const counter = useRef(8);

  return (
    <Autocomplete
      {...props}
      value={selectedOption}
      options={options.filter((option) => {
        if (searchValue) {
          return option.label.toLowerCase().includes(searchValue.toLowerCase());
        }
        return true;
      })}
      onSearch={(search) => {
        setSearchValue(search);
      }}
      onSelect={setSelectedOption}
      onAddOption={(newOptionLabel) => {
        const newOption = {
          key: `${++counter.current}`,
          label: newOptionLabel,
        };
        setOptions((options) => {
          return options
            .concat(newOption)
            .sort((a, b) => a.label.localeCompare(b.label));
        });
        return newOption;
      }}
      renderAddOption={(inputValue) => {
        return <DropdownItem label={<span>Create {inputValue}</span>} />;
      }}
    />
  );
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
  },
  parameters: {
    layout: 'centered',
  },
  render: Template,
};

export const FitParent: Story = {
  ...Default,
  args: {
    fit: 'parent',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  render: Default.render,
  args: {
    isDisabled: true,
  },
  parameters: {
    layout: 'centered',
  },
};

export const InADisabledFieldset: Story = {
  render: Template,
  decorators: [
    (Story) => (
      <fieldset disabled>
        <Story />
      </fieldset>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export const Invalid: Story = {
  ...Default,
  args: {
    isInvalid: true,
  },
};

export const MagicGradient: Story = {
  ...Default,
  args: {
    inputVariant: 'magicGradient',
  },
};

export const PlacementTop: Story = {
  ...Default,
  args: {
    placement: 'top-start',
  },
  parameters: {
    layout: 'centered',
  },
};

export const WithClearSelectionButton: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await userEvent.click(
      await canvas.findByRole('option', { name: 'Marketing' }),
    );
  },
  args: {
    showClearSelectionButton: true,
  },
};

export const AddOption: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('combobox'), 'Chromatic');
    await userEvent.click(
      canvas.getByRole('option', { name: 'Create Chromatic' }),
    );
  },
  args: {
    showClearSelectionButton: true,
  },
  parameters: {
    layout: 'centered',
  },
  render: TemplateWithAddOption,
};

export const WithRenderPrefix: Story = {
  ...Default,
  args: {
    renderPrefix: () => (
      <Avatar
        size={24}
        text="Spendesk"
        iconName="building-storefront"
        variant="square"
      />
    ),
  },
  parameters: {
    layout: 'centered',
  },
};

export const WithRenderOption: Story = {
  ...WithRenderPrefix,
  args: {
    renderPrefix: (option) =>
      option && (
        <Avatar
          size={24}
          text="Spendesk"
          iconName="building-storefront"
          variant="square"
        />
      ),
    renderOption: (option, state) => (
      <DropdownItem
        {...state}
        label={option.label}
        prefix={
          <Avatar
            size={24}
            text="Spendesk"
            iconName="building-storefront"
            variant="square"
          />
        }
      />
    ),
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
