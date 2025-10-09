import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';
import { ActionBar, FloatingActionBar } from '../ActionBar';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof ActionBar> = {
  title: 'Interaction/ActionBar',
  component: ActionBar,
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const Default: Story = {
  args: {
    className: 'myClassName',
    children: '3 selected',
    actions: [
      {
        text: 'Archive',
        onClick: action('Archive onChange'),
        iconName: 'archive',
      },
      {
        text: 'Edit',
        onClick: action('Edit onChange'),
        iconName: 'pen',
      },
      {
        text: 'Download',
        onClick: action('Label 3 onChange'),
        iconName: 'arrow-down-tray',
      },
    ],
  },
};

export const WithoutIcon: Story = {
  args: {
    className: 'myClassName',
    children: '1 selected',
    actions: [
      {
        text: 'Label 1',
        onClick: action('Label 1 onChange'),
      },
      {
        text: 'Label 2',
        onClick: action('Label 2 onChange'),
      },
    ],
  },
};

export const SingleAction: Story = {
  args: {
    className: 'myClassName',
    children: '0 selected',
    actions: [
      {
        text: 'Download',
        onClick: action('Label 3 onChange'),
        iconName: 'arrow-down-tray',
      },
    ],
  },
};

export const DisabledAction: Story = {
  args: {
    className: 'myClassName',
    children: '1 selected',
    actions: [
      {
        text: 'Label 1',
        onClick: action('Label 1 onChange'),
        isDisabled: true,
      },
      {
        text: 'Label 2',
        onClick: action('Label 2 onChange'),
      },
    ],
  },
};

export const LoadingAction: Story = {
  args: {
    className: 'myClassName',
    children: '1 selected',
    actions: [
      {
        text: 'Label 1',
        onClick: action('Label 1 onChange'),
        isLoading: true,
      },
      {
        text: 'Label 2',
        onClick: action('Label 2 onChange'),
      },
    ],
  },
};

export const DisabledActionWithTooltip: Story = {
  args: {
    className: 'myClassName',
    children: '1 selected',
    actions: [
      {
        text: 'Label 1',
        onClick: action('Label 1 onChange'),
        isDisabled: true,
        tooltipContent: 'This action is disabled',
        tooltipPlacement: 'bottom',
      },
      {
        text: 'Label 2',
        onClick: action('Label 2 onChange'),
      },
    ],
  },
};

export const Floating: Story = {
  args: {
    className: 'myClassName',
    children: '0 selected',
    actions: [
      {
        text: 'Download',
        onClick: action('Label 3 onChange'),
        iconName: 'arrow-down-tray',
      },
    ],
  },
  render: (args) => <FloatingActionBar {...args} />,
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        WithoutIcon,
        SingleAction,
        DisabledAction,
        LoadingAction,
        DisabledActionWithTooltip,
        Floating,
      ]}
      meta={meta}
    />
  ),
};
