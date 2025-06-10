import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from '../Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Skeleton/Generic',
  component: Skeleton,
  tags: ['legacy'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: '360px',
    height: '24px',
  },
};
