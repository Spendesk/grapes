import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';
import React from 'react';

import { Button } from '../../Button';
import { Popover } from '../Popover';

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
