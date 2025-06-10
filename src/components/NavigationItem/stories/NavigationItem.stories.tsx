import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { NavigationItem } from '../NavigationItem';
import { Badge } from '../../Badge';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof NavigationItem> = {
  title: 'Navigation/NavigationItem',
  args: {
    text: 'Navigation item',
  },
  component: NavigationItem,
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const Default: Story = {};

export const WithLink: Story = {
  args: {
    component: 'a',
    href: 'https://grapes.spendesk.design/',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
};

export const WithLeftAddon: Story = {
  args: {
    leftAddon: <Badge variant="secondary">12</Badge>,
  },
};

export const WithRightAddon: Story = {
  args: {
    rightAddon: <Badge variant="secondary">12</Badge>,
  },
};

export const IsActive: Story = {
  args: {
    isActive: true,
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Default, WithLink, WithLeftAddon, WithRightAddon, IsActive]}
      meta={meta}
    />
  ),
};
