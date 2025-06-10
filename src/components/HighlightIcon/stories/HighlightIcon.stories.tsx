import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { HighlightIcon } from '../HighlightIcon';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof HighlightIcon> = {
  title: 'Icons/HighlightIcon',
  render: (args) => (
    // Make sure the story includes an aria-label
    <HighlightIcon {...args} aria-label={args.name} />
  ),
  component: HighlightIcon,
  args: { variant: 'info', name: 'circle-information', size: 32 },
};

export default meta;
type Story = StoryObj<typeof HighlightIcon>;

export const Alert: Story = {
  args: {
    variant: 'alert',
    name: 'hexagone-cross',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    name: 'circle-information',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    name: 'circle-check',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    name: 'triangle-warning',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    name: 'lock-close',
  },
};

export const Apricot: Story = {
  args: {
    variant: 'apricot',
    name: 'plane',
  },
};

export const Blue: Story = {
  args: {
    variant: 'blue',
    name: 'plane',
  },
};

export const Carbon: Story = {
  args: {
    variant: 'carbon',
    name: 'plane',
  },
};

export const Emerald: Story = {
  args: {
    variant: 'emerald',
    name: 'plane',
  },
};

export const Forest: Story = {
  args: {
    variant: 'forest',
    name: 'plane',
  },
};

export const Grolive: Story = {
  args: {
    variant: 'grolive',
    name: 'plane',
  },
};

export const Lemon: Story = {
  args: {
    variant: 'lemon',
    name: 'plane',
  },
};

export const Ocean: Story = {
  args: {
    variant: 'ocean',
    name: 'plane',
  },
};

export const Pink: Story = {
  args: {
    variant: 'pink',
    name: 'plane',
  },
};

export const Peach: Story = {
  args: {
    variant: 'peach',
    name: 'plane',
  },
};

export const Purple: Story = {
  args: {
    variant: 'purple',
    name: 'plane',
  },
};

export const Size24: Story = {
  args: {
    size: 24,
  },
};

export const Size32: Story = {
  args: {
    size: 32,
  },
};

export const Size40: Story = {
  args: {
    size: 40,
  },
};

export const Size56: Story = {
  args: {
    size: 56,
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Alert,
        Info,
        Success,
        Warning,
        Neutral,
        Apricot,
        Blue,
        Carbon,
        Emerald,
        Forest,
        Grolive,
        Lemon,
        Ocean,
        Pink,
        Peach,
        Purple,
        Size24,
        Size32,
        Size40,
        Size56,
      ]}
      meta={meta}
    />
  ),
};
