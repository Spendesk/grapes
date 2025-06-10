import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { FileCard } from '../FileCard';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof FileCard> = {
  title: 'Data display/FileCard',
  component: FileCard,
  args: {
    title: 'File name.pdf',
    mimeType: 'application/pdf',
    onClick: (e) => {
      action('onClick')(e);
    },
  },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <FileCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof FileCard>;

export const PDF: Story = {};

export const Image: Story = {
  args: {
    title: 'File name.png',
    mimeType: 'image/png',
  },
};

export const Unknown: Story = {
  args: {
    title: 'File name.txt',
    mimeType: 'text/plain',
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Uploaded: Sept 09 2023',
  },
};

export const WithDelete: Story = {
  args: {
    description: 'Uploaded: Sept 09 2023',
    onDelete: (e) => {
      action('onDelete')(e);
    },
  },
};

export const WithLongTitle: Story = {
  args: {
    title: 'Loremipsumdolorsitametconsecteturadipiscingelit.pdf',
    description: 'Uploaded: Sept 09 2023',
  },
};

export const WithLongDescription: Story = {
  args: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const Highlighted: Story = {
  args: {
    isHighlighted: true,
  },
};

export const Alert: Story = {
  args: {
    variant: 'alert',
  },
};

export const NotClickable: Story = {
  args: {
    onClick: undefined,
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        PDF,
        Image,
        Unknown,
        WithDescription,
        WithDelete,
        WithLongTitle,
        WithLongDescription,
        Highlighted,
        Alert,
        NotClickable,
      ]}
      meta={meta}
    />
  ),
};
