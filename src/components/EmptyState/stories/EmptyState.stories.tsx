import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../Button';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

import { EmptyState } from '../EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const WithIcon: Story = {
  args: {
    actions: <Button variant="primaryBrand" text="Discover" />,
    iconName: 'sparkle',
    title: 'Split your payable into multiple lines.',
    subtitle:
      'You can split your transaction across several  expense accounts and VAT lines to best prepare your export.',
  },
};
export const WithIllustration: Story = {
  args: {
    actions: <Button variant="primaryBrand" text="Discover" />,
    illustration: <img src="images/illustration.webp" alt="" />,
    title: 'Save time and filter your payables.',
    subtitle:
      'Filter/categorise your payables by period of time, supplier, payer or expense type to save time.',
  },
};
export const WithMultipleActions: Story = {
  args: {
    ...WithIllustration.args,
    title: 'Save time and filter your payables now.',
    actions: [
      <Button key="primary" variant="secondaryNeutral" text="Contact us" />,
      <Button key="secondary" variant="primaryBrand" text="Discover" />,
    ],
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[WithIcon, WithIllustration, WithMultipleActions]}
      meta={meta}
    />
  ),
};
