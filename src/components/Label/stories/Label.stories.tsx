import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Label';
import { Icon } from '../../Icon';

const meta: Meta<typeof Label> = {
  title: 'Form/Label',
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    label: 'My label',
  },
};

export const Hint: Story = {
  args: {
    fit: 'parent',
    label: 'My label',
    hint: 'Required',
  },
};

export const MarvinHint: Story = {
  args: {
    fit: 'parent',
    label: 'My label',
    hint: <Icon name="robot" />,
  },
};

export const InfoTipContent: Story = {
  args: {
    fit: 'parent',
    label: 'My label',
    hint: 'Required',
    infoTipContent: 'Something helpful',
  },
};
