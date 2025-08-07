import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';
import { action } from 'storybook/actions';
import React from 'react';

import { Button } from '../../Button';
import { Popover } from '../Popover';
import { Select } from '../../Select';

const meta: Meta<typeof Popover> = {
  title: 'Navigation/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'Show me a dropdown',
    });
    await userEvent.click(openButton);
  },
  render: (args) => (
    <Popover
      placement={args.placement}
      renderTrigger={(triggerProps) => {
        return (
          <Button
            {...triggerProps}
            text="Show me a dropdown"
            variant="primaryBrand"
          />
        );
      }}
    >
      {(closeDropdown) => (
        <div
          style={{
            padding: '16px',
            textAlign: 'center',
            minWidth: '400px',
            boxSizing: 'border-box',
          }}
        >
          Hey there!
          <br />
          <div>
            Look at me, I&apos;m a dropdown&nbsp;
            <span role="img" aria-label="Sheep emoji">
              🐑
            </span>
          </div>
          <Button
            variant="primaryBrand"
            text="Close me"
            onClick={closeDropdown}
          />
        </div>
      )}
    </Popover>
  ),
};

export const PlacementTopEnd: Story = {
  args: {
    placement: 'top-end',
  },
  play: Default.play,
  render: Default.render,
};

export const PlacementEndBottom: Story = {
  args: {
    placement: 'end-bottom',
  },
  play: Default.play,
  render: Default.render,
};

const costCenters = [
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

export const DropdownInside: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'Show me a dropdown',
    });
    await userEvent.click(openButton);

    const dropdown = canvas.getByRole('button', {
      name: 'Show options',
    });
    await userEvent.click(dropdown);
  },
  render: (args) => (
    <Popover
      placement={args.placement}
      renderTrigger={(triggerProps) => {
        return (
          <Button
            {...triggerProps}
            text="Show me a dropdown"
            variant="primaryBrand"
          />
        );
      }}
    >
      {() => (
        <div
          style={{
            padding: '16px',
            minWidth: '400px',
          }}
        >
          <Select
            value={undefined}
            onSelect={action('onSelect')}
            options={costCenters}
          />
        </div>
      )}
    </Popover>
  ),
};
