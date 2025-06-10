import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from '../../Avatar';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

import { Tag } from '../Tag';

const meta: Meta<typeof Tag> = {
  title: 'Feedback/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    iconName: 'clock-filled',
    children: 'Status',
  },
};
export const Info: Story = {
  args: {
    variant: 'info',
    iconName: 'circle-information',
    children: 'Status',
  },
};
export const Success: Story = {
  args: {
    variant: 'success',
    iconName: 'circle-check',
    children: 'Status',
  },
};
export const Warning: Story = {
  args: {
    variant: 'warning',
    iconName: 'triangle-warning',
    children: 'Status',
  },
};
export const Alert: Story = {
  args: {
    variant: 'alert',
    iconName: 'hexagone-cross',
    children: 'Status',
  },
};

export const Carbon: Story = {
  args: {
    variant: 'carbon',
    children: 'My tag',
  },
};
export const Grolive: Story = {
  args: {
    variant: 'grolive',
    children: 'My tag',
  },
};
export const Forest: Story = {
  args: {
    variant: 'forest',
    children: 'My tag',
  },
};
export const Lemon: Story = {
  args: {
    variant: 'lemon',
    children: 'My tag',
  },
};
export const Ocean: Story = {
  args: {
    variant: 'ocean',
    children: 'My tag',
  },
};
export const Purple: Story = {
  args: {
    variant: 'purple',
    children: 'My tag',
  },
};
export const Pink: Story = {
  args: {
    variant: 'pink',
    children: 'My tag',
  },
};
export const Peach: Story = {
  args: {
    variant: 'peach',
    children: 'My tag',
  },
};
export const White: Story = {
  args: {
    variant: 'white',
    children: 'My tag',
  },
};
export const CarbonClickable: Story = {
  args: {
    ...Carbon.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const GroliveClickable: Story = {
  args: {
    ...Grolive.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const ForestClickable: Story = {
  args: {
    ...Forest.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const LemonClickable: Story = {
  args: {
    ...Lemon.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const OceanClickable: Story = {
  args: {
    ...Ocean.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const PurpleClickable: Story = {
  args: {
    ...Purple.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const PinkClickable: Story = {
  args: {
    ...Pink.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const PeachClickable: Story = {
  args: {
    ...Peach.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const WhiteClickable: Story = {
  args: {
    ...White.args,
    onClose: () => {
      console.log('close');
    },
  },
};
export const WithIcon: Story = {
  args: {
    ...Purple.args,
    iconName: 'plane',
  },
};
export const WithAnAvatar: Story = {
  args: {
    variant: 'carbon',
    children: (
      <>
        <Avatar
          variant="circle"
          src="images/aurelien.webp"
          size={16}
          text="aurelien"
        />
        <span>Alex Smith</span>
      </>
    ),
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Neutral,
        Info,
        Success,
        Warning,
        Alert,
        Carbon,
        Grolive,
        Forest,
        Lemon,
        Ocean,
        Purple,
        Pink,
        Peach,
        White,
        CarbonClickable,
        GroliveClickable,
        ForestClickable,
        LemonClickable,
        OceanClickable,
        PurpleClickable,
        PinkClickable,
        PeachClickable,
        WhiteClickable,
        WithIcon,
        WithAnAvatar,
      ]}
      meta={meta}
    />
  ),
};
