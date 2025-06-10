import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonTag } from '../SkeletonTag';

const meta: Meta<typeof SkeletonTag> = {
  title: 'Skeleton/Tag',
  component: SkeletonTag,
};

export default meta;
type Story = StoryObj<typeof SkeletonTag>;

export const Default: Story = {};

export const WithCustomWidth: Story = {
  args: {
    width: '360px',
  },
};
