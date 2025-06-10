/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from 'storybook/test';

import { Button } from '../../Button';
import { DropdownItem } from '../../DropdownItem';
import { DropdownMenu } from '../DropdownMenu';
import { CheckboxInput } from '../../CheckboxInput';
import { TriggerProps } from '../../Popover';

const costCenters = [
  { key: 'marketing', label: 'Marketing' },
  { key: 'legal', label: 'Legal' },
  { key: 'office', label: 'Office' },
  { key: 'platform', label: 'Platform' },
  { key: 'finance', label: 'Finance' },
  { key: 'recruitment', label: 'Recruitment' },
  { key: 'sales', label: 'Sales' },
  { key: 'hr', label: 'HR' },
  { key: 'it', label: 'IT' },
  { key: 'customer-service', label: 'Customer Service' },
  { key: 'product', label: 'Product' },
  { key: 'engineering', label: 'Engineering' },
];

const meta: Meta<typeof DropdownMenu> = {
  title: 'Navigation/DropdownMenu',
  component: DropdownMenu,
  args: {
    options: costCenters,
    renderButton: (getToggleButtonProps: () => TriggerProps) => {
      return (
        <Button
          {...getToggleButtonProps()}
          variant="tertiaryNeutral"
          text="Cost centers"
        />
      );
    },
    renderOption: (option) => <DropdownItem label={option.label} />,
    onSelect: (e) => {
      action('onSelect')(e);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'open menu',
    });
    await userEvent.click(openButton);
    await waitFor(async () => {
      expect(
        await canvas.findByRole('option', { name: 'Marketing' }),
      ).toBeVisible();
    });
  },
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};

export const WithPlacementTop: Story = {
  args: {
    placement: 'top-start',
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [selectedBooks, setSelectedBooks] = useState<string[] | undefined>(
      undefined,
    );

    return (
      <DropdownMenu
        keepOpenOnSelect
        renderButton={(getToggleButtonProps: () => TriggerProps) => (
          <Button
            {...getToggleButtonProps()}
            text="Cost centers"
            variant="tertiaryNeutral"
          />
        )}
        options={costCenters}
        onSelect={(option) => {
          if (selectedBooks?.includes(option.key)) {
            const filteredSelectedBooks = selectedBooks?.filter(
              (s) => s !== option.key,
            );
            setSelectedBooks(
              filteredSelectedBooks.length ? filteredSelectedBooks : undefined,
            );
          } else {
            setSelectedBooks([...(selectedBooks ?? []), option.key]);
          }
        }}
        renderOption={(option) => {
          const isSelected = selectedBooks
            ? selectedBooks.includes(option.key)
            : false;
          return (
            <DropdownItem
              key={option.key}
              label={option.label}
              isSelected={isSelected}
              // TODO: we shouldn't use the checkbox component only for visual clue (but a simple icon)
              prefix={
                <CheckboxInput isChecked={isSelected} onChange={() => {}} />
              }
            />
          );
        }}
      />
    );
  },
};

export const WithDropdownWidthFitToButton: Story = {
  args: {
    renderButton: (getToggleButtonProps: () => TriggerProps) => {
      return (
        <div style={{ width: '300px' }}>
          <Button
            {...getToggleButtonProps()}
            fit="parent"
            variant="tertiaryNeutral"
            text="Cost centers"
          />
        </div>
      );
    },
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
