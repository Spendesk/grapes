import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { Toast } from '../Toast';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: 'Your receipt has been uploaded',
    variant: 'success',
  },
  render: (args) => (
    <Toast
      title={args.title}
      variant={args.variant}
      onClose={action('onClose')}
    >
      {args.children}
    </Toast>
  ),
};
export const Alert: Story = {
  ...Default,
  args: {
    title: 'Your receipt has been uploaded',
    variant: 'alert',
  },
};

export const WithADescription: Story = {
  ...Default,
  args: {
    title: 'Your receipt has been uploaded',
    variant: 'success',
    children: 'Description (optional)',
  },
};

export const withAction: Story = {
  args: {
    title: 'Your receipt has been uploaded',
    action: {
      text: 'Action',
      onClick: action('actionClicked'),
    },
    onClose: action('onClose'),
  },
  render: (args) => (
    <Toast title={args.title} action={args.action} onClose={args.onClose} />
  ),
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Default, Alert, WithADescription, withAction]}
      meta={meta}
    />
  ),
};
