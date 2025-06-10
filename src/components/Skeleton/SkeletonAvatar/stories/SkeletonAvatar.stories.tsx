import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonAvatar } from '../SkeletonAvatar';

const meta: Meta<typeof SkeletonAvatar> = {
  title: 'Skeleton/Avatar',
  component: SkeletonAvatar,
};

export default meta;
type Story = StoryObj<typeof SkeletonAvatar>;

export const SmallSquare: Story = {
  args: {
    variant: 'square',
    size: 's',
  },
};

export const MediumSquare: Story = {
  args: {
    variant: 'square',
    size: 'm',
  },
};

export const LargeSquare: Story = {
  args: {
    variant: 'square',
    size: 'l',
  },
};

export const SmallCircle: Story = {
  args: {
    variant: 'circle',
    size: 's',
  },
};

export const MediumCircle: Story = {
  args: {
    variant: 'circle',
    size: 'm',
  },
};

export const LargeCircle: Story = {
  args: {
    variant: 'circle',
    size: 'l',
  },
};
