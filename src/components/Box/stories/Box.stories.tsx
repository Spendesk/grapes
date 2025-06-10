import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '..';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Box> = {
  title: 'Data display/Box',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Primary: Story = {
  args: {
    children: 'Hello World',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Hello World',
    variant: 'secondary',
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
