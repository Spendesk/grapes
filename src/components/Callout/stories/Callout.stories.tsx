import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';
import { Callout } from '../Callout';

const meta: Meta<typeof Callout> = {
  title: 'Feedback/Callout',
  component: Callout,
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Alert: Story = {
  args: { variant: 'alert', title: 'Alert callout title' },
};
export const Info: Story = {
  args: { variant: 'info', title: 'Info callout title' },
};
export const Success: Story = {
  args: { variant: 'success', title: 'Success callout title' },
};
export const Warning: Story = {
  args: { variant: 'warning', title: 'Warning callout title' },
};
export const WithContent: Story = {
  args: {
    title: 'Budget allocation',
    children:
      'On the budget, the amount of the invoice will be proportionally reflected over the period',
  },
};
export const WithSpecificIcon: Story = {
  args: {
    title: 'Plane budget allocation',
    iconName: 'plane',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Alert, Info, Success, Warning, WithContent, WithSpecificIcon]}
      meta={meta}
    />
  ),
};
