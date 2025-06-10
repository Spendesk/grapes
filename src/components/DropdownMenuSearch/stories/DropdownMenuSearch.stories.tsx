/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';

import { Button } from '../../Button';
import {
  DropdownMenuSearch,
  DropdownMenuSearchProps,
} from '../DropdownMenuSearch';
import { AutocompleteNoOptions } from '../../AutocompleteNoOptions';
import { Avatar } from '../../Avatar';

import fallbackImage from './fallbackImage.svg';

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

type Option = (typeof costCenterOptions)[number];

const Template = (props: DropdownMenuSearchProps<Option>) => {
  const [options, setOptions] = useState(props.options);
  const [selectedOption, setSelectedOption] = useState<Option>();

  const triggerLabel = selectedOption
    ? `Selected company: ${selectedOption.label}`
    : 'Search companies';
  return (
    <DropdownMenuSearch
      {...props}
      value={selectedOption}
      options={options}
      onSearch={(value) => {
        if (!value) {
          setOptions(costCenterOptions);
          return;
        }
        setOptions(
          costCenterOptions.filter((option) =>
            option.label.toLowerCase().includes(value.toLowerCase()),
          ),
        );
      }}
      onSelect={setSelectedOption}
      renderTrigger={(getToggleButtonProps) => {
        return (
          <Button
            {...getToggleButtonProps}
            variant="tertiaryNeutral"
            text={triggerLabel}
          />
        );
      }}
    />
  );
};

const meta: Meta<typeof DropdownMenuSearch> = {
  title: 'Navigation/DropdownMenuSearch (Beta)',
  component: DropdownMenuSearch,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'Search companies',
    });
    await userEvent.click(openButton);
  },
  render: Template,
  args: {
    options: costCenterOptions,
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenuSearch>;

export const Default: Story = {};

export const KeepOpen: Story = {
  args: {
    keepOpenOnSelect: true,
  },
};

const Prefix = ({ name }: { name: string | null }) => (
  <Avatar
    variant="square"
    size={24}
    src={`https://logo.clearbit.com/${name}.com`}
    fallbackSrc={fallbackImage}
    text={name ?? ''}
  />
);
export const WithPrefix: Story = {
  args: {
    renderPrefix: (option) => <Prefix name={option ? option.label : null} />,
    keepOpenOnSelect: true,
  },
};

export const Asynchronous: Story = {
  args: {
    placeholder: 'Search a company',
  },
  render: (props: DropdownMenuSearchProps<Option>) => {
    const [options, setOptions] = useState<typeof costCenterOptions>([]);
    const [selectedOption, setSelectedOption] = useState<Option>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const triggerLabel = selectedOption
      ? `Selected company: ${selectedOption.label}`
      : 'Search companies';

    return (
      <div style={{ width: '360px' }}>
        <DropdownMenuSearch
          {...props}
          value={selectedOption}
          options={options}
          isLoading={isLoading}
          renderTrigger={(getToggleButtonProps) => {
            return (
              <Button
                {...getToggleButtonProps}
                variant="tertiaryNeutral"
                text={triggerLabel}
              />
            );
          }}
          renderNoOptions={(rawValue) => {
            if (rawValue.length === 0) {
              return (
                <AutocompleteNoOptions>
                  <div>Start typing to search companies</div>
                </AutocompleteNoOptions>
              );
            }

            return (
              <AutocompleteNoOptions>
                <div>There are no results for {rawValue}</div>
              </AutocompleteNoOptions>
            );
          }}
          onSearch={async (value) => {
            setIsLoading(true);
            if (value === undefined || value.length === 0) {
              setIsLoading(false);
              setOptions([]);
              return;
            }

            await new Promise((resolve) => setTimeout(resolve, 500));

            setOptions(
              costCenterOptions.filter((option) =>
                option.label.toLowerCase().includes(value.toLowerCase()),
              ),
            );
            setIsLoading(false);
          }}
          onSelect={setSelectedOption}
        />
      </div>
    );
  },
};

export const WithGroups: Story = {
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
