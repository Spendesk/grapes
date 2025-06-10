import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonCheckbox } from '../SkeletonCheckbox';

const meta: Meta<typeof SkeletonCheckbox> = {
  title: 'Skeleton/CheckboxInput',
  component: SkeletonCheckbox,
};

export default meta;
type Story = StoryObj<typeof SkeletonCheckbox>;

export const Default: Story = {};
