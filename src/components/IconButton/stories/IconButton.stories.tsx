import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { IconButton } from '../IconButton';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof IconButton> = {
  title: 'Interaction/IconButton',
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const PrimaryBrand: Story = {
  args: {
    variant: 'primaryBrand',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const PrimaryInfo: Story = {
  args: {
    variant: 'primaryInfo',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const PrimarySuccess: Story = {
  args: {
    variant: 'primarySuccess',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const PrimaryWarning: Story = {
  args: {
    variant: 'primaryWarning',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const PrimaryAlert: Story = {
  args: {
    variant: 'primaryAlert',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const SecondaryBrand: Story = {
  args: {
    variant: 'secondaryBrand',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const SecondaryNeutral: Story = {
  args: {
    variant: 'secondaryNeutral',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const SecondaryInfo: Story = {
  args: {
    variant: 'secondaryInfo',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const SecondarySuccess: Story = {
  args: {
    variant: 'secondarySuccess',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const SecondaryWarning: Story = {
  args: {
    variant: 'secondaryWarning',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const SecondaryAlert: Story = {
  args: {
    variant: 'secondaryAlert',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const TertiaryBrand: Story = {
  args: {
    variant: 'tertiaryBrand',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const TertiaryNeutral: Story = {
  args: {
    variant: 'tertiaryNeutral',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const TertiaryInfo: Story = {
  args: {
    variant: 'tertiaryInfo',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const TertiarySuccess: Story = {
  args: {
    variant: 'tertiarySuccess',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const TertiaryWarning: Story = {
  args: {
    variant: 'tertiaryWarning',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};
export const TertiaryAlert: Story = {
  args: {
    variant: 'tertiaryAlert',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
  },
};

export const DisabledPrimary: Story = {
  args: {
    variant: 'primaryBrand',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
    isDisabled: true,
  },
};
export const DisabledSecondary: Story = {
  args: {
    variant: 'secondaryNeutral',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
    isDisabled: true,
  },
};
export const DisabledTertiary: Story = {
  args: {
    variant: 'tertiaryNeutral',
    iconName: 'ellipsis-vertical',
    'aria-label': 'menu',
    isDisabled: true,
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        PrimaryBrand,
        PrimaryInfo,
        PrimarySuccess,
        PrimaryWarning,
        PrimaryAlert,
        SecondaryBrand,
        SecondaryNeutral,
        SecondaryInfo,
        SecondarySuccess,
        SecondaryWarning,
        SecondaryAlert,
        TertiaryBrand,
        TertiaryNeutral,
        TertiaryInfo,
        TertiarySuccess,
        TertiaryWarning,
        TertiaryAlert,
        DisabledPrimary,
        DisabledSecondary,
        DisabledTertiary,
      ]}
      meta={meta}
    />
  ),
};
