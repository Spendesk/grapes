import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '..';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';
import { Select } from '../../Select';
import { action } from 'storybook/actions';

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

const costCenters = [
  { key: 'marketing', label: 'Marketing' },
  { key: 'legal', label: 'Legal' },
  { key: 'office', label: 'Office' },
  { key: 'platform', label: 'Platform' },
  { key: 'finance', label: 'Finance' },
  { key: 'product', label: 'Product' },
  { key: 'engineering', label: 'Engineering' },
];

export const WithDropdownInside: Story = {
  args: {
    children: (
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
    ),
    variant: 'primary',
  },
};
