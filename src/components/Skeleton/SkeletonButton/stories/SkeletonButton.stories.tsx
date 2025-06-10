import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonButton } from '../SkeletonButton';

const meta: Meta<typeof SkeletonButton> = {
  title: 'Skeleton/Button',
  component: SkeletonButton,
};

export default meta;
type Story = StoryObj<typeof SkeletonButton>;

export const Default: Story = {};

export const WithCustomWidth: Story = {
  args: {
    width: '360px',
  },
};
