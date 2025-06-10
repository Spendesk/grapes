import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { DeprecatedPreview } from '../DeprecatedPreview';
import { Icon } from '../../Icon';
import { Tag } from '../../Tag';

import { colors } from '../../../colors';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof DeprecatedPreview> = {
  title: 'Data display/DeprecatedPreview',
  component: DeprecatedPreview,
  tags: ['deprecated', 'legacy'],
  args: {
    primaryText: 'Uploaded on November 4, 2020',
    onClick: (e) => {
      action('onClick')(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeprecatedPreview>;

export const WithRightAddon: Story = {
  args: {
    rightAddon: (
      <Icon
        name="magnifying-glass"
        color={colors.contentPrimary}
        aria-hidden="true"
      />
    ),
  },
};

export const WithSecondaryTextAndRightAddon: Story = {
  args: {
    primaryText: '€400.00',
    secondaryText: 'From your bank',
    rightAddon: (
      <>
        <div style={{ marginRight: '8px' }}>
          <Tag variant="success" iconName="circle-check">
            Paid
          </Tag>
        </div>
        <Icon name="chevron-right" color={colors.contentPrimary} />
      </>
    ),
  },
};

export const WithCustomPrimaryAndSecondaryText: Story = {
  args: {
    primaryText: (
      <span style={{ textDecoration: 'line-through' }}>€400.00</span>
    ),
    secondaryText: (
      <span style={{ textDecoration: 'line-through' }}>From your bank</span>
    ),
    rightAddon: (
      <>
        <div style={{ marginRight: '8px' }}>
          <Tag variant="success" iconName="circle-check">
            Paid
          </Tag>
        </div>
        <Icon name="chevron-right" color={colors.contentPrimary} />
      </>
    ),
  },
};

export const WithOverflowingSecondaryText: Story = {
  args: {
    primaryText: 'Main text',
    secondaryText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    fit: 'parent',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        WithRightAddon,
        WithSecondaryTextAndRightAddon,
        WithCustomPrimaryAndSecondaryText,
        WithOverflowingSecondaryText,
      ]}
      meta={meta}
    />
  ),
};
