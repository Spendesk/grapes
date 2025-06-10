import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

import { Badge } from '../Badge';

const meta: Meta<typeof Badge> = {
  title: 'Feedback/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '12',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '12',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer stories={[Primary, Secondary]} meta={meta} />
  ),
};
