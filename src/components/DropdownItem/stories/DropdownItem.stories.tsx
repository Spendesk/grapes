import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { DropdownItem } from '../DropdownItem';
import { Avatar } from '../../Avatar';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof DropdownItem> = {
  title: 'Navigation/DropdownItem',
  component: DropdownItem,
  args: { label: 'Michael Murphy' },
};

export default meta;
type Story = StoryObj<typeof DropdownItem>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    helpText: 'Growth team',
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Disabled: Story = {
  render: (args) => (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <li aria-disabled="true">
      <DropdownItem {...args} />
    </li>
  ),
};

export const WithPrefix: Story = {
  args: {
    prefix: (
      <Avatar
        variant="square"
        size={24}
        src="images/aurelien.webp"
        text="Aurelien"
      />
    ),
  },
};

export const WithSuffix: Story = {
  args: {
    suffix: <span>24€</span>,
  },
};

export const WithPrefixSuffixAndDescription: Story = {
  args: {
    prefix: (
      <Avatar
        variant="square"
        size={24}
        src="images/aurelien.webp"
        text="Aurelien"
      />
    ),
    suffix: <span>24€</span>,
    helpText:
      'Est sapiente voluptatibus dolor est labore. Sit voluptatum et nemo cum saepe tempore. Totam veritatis temporibus officiis non molestias non quia facere.',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        Selected,
        Disabled,
        WithPrefix,
        WithSuffix,
        WithDescription,
        WithPrefixSuffixAndDescription,
      ]}
      meta={meta}
    />
  ),
};
