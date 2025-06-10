import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dots } from '../Dots';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Dots> = {
  title: 'Data display/Dots',
  component: Dots,
};

export default meta;
type Story = StoryObj<typeof Dots>;

export const Primary: Story = {
  args: {
    length: 5,
    activeDotIndex: 2,
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => <SnapshotContainer stories={[Primary]} meta={meta} />,
};
