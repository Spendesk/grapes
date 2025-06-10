import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import illustration from './illustration.webp';

import { Banner } from '../Banner';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Banner> = {
  title: 'Feedback/Banner',
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Brand: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Track your budgets',
    actionText: 'Set up sub-budgets',
    illustration: <img src={illustration} alt="" height="100px" />,
    children:
      'You can now track sub-budgets based on expense categories. It will help you track your budgets with more granularity and precision.',
  },
};

export const Neutral: Story = {
  ...Brand,
  args: {
    variant: 'neutral',
    title: 'Track your budget with Spendesk',
    actionText: 'See my budget',
    illustration: <img src={illustration} alt="" height="100px" />,
    children:
      'You can now experience accurate and efficient expense tracking. Try it out!',
  },
};

export const WithPrimaryButton: Story = {
  ...Brand,
  args: {
    variant: 'neutral',
    title: 'Track your budget with Spendesk',
    actionText: 'See my budget',
    illustration: <img src={illustration} alt="" height="100px" />,
    children:
      'You can now experience accurate and efficient expense tracking. Try it out!',
    buttonVariant: 'primaryBrand',
  },
};

export const WithoutIllustration: Story = {
  ...Brand,
  args: {
    variant: 'neutral',
    title: 'Track your budget with Spendesk',
    actionText: 'See my budget',
    children:
      'You can now experience accurate and efficient expense tracking. Try it out!',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Brand, Neutral, WithoutIllustration]}
      meta={meta}
    />
  ),
};
