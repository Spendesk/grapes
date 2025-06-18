import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Icon, type IconName, type IconSize } from '../Icon';
import { iconMap } from '../../../icons';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Icon> = {
  title: 'Icons/Icon',
  component: Icon,
  tags: ['legacy'],
  args: {
    color: 'black',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const Wrapper = (props: { size?: IconSize; color?: string }) => {
  return (
    <div>
      {Object.keys(iconMap).map((iconName) => (
        <Icon
          key={iconName}
          name={iconName as IconName}
          aria-label={iconName} // Make sure the story includes an aria-label
          {...props}
        />
      ))}
    </div>
  );
};

export const SizeS: Story = {
  args: { size: 's' },
  render: Wrapper,
};

export const SizeM: Story = {
  args: { size: 'm' },
  render: Wrapper,
};

export const SizeL: Story = {
  args: { size: 'l' },
  render: Wrapper,
};

export const SizeXL: Story = {
  args: { size: 'xl' },
  render: Wrapper,
};

export const WithColor: Story = {
  args: { color: '#5d21d2' },
  render: Wrapper,
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[SizeS, SizeM, SizeL, SizeXL, WithColor]}
      meta={meta}
    />
  ),
};
