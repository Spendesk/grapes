import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { InfoTip } from '../InfoTip';

const meta: Meta<typeof InfoTip> = {
  title: 'Data display/InfoTip',
  render: (args) => <InfoTip {...args} aria-label="Info tip" />,
  args: {
    content: 'Some useful information to make your life easier.',
  },
};

export default meta;
type Story = StoryObj<typeof InfoTip>;

export const Default: Story = {};
