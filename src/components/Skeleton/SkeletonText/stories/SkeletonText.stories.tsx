import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonText } from '../SkeletonText';

const meta: Meta<typeof SkeletonText> = {
  title: 'Skeleton/Text',
  component: SkeletonText,
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

export const Small: Story = {
  args: {
    size: 's',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
  },
};

export const Large: Story = {
  args: {
    size: 'l',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const ExtraExtraLarge: Story = {
  args: {
    size: 'xxl',
  },
};
