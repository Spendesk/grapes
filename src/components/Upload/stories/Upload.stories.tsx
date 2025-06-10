import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import styles from './UploadStories.module.css';
import { Upload } from '../Upload';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Upload> = {
  title: 'Form/Upload (Dropzone)',
  component: Upload,
  args: {
    content: (
      <span style={{ color: 'var(--color-content-secondary-bg-primary)' }}>
        Drag & drop file(s) here <br />
        or{' '}
        <u style={{ color: 'var(--color-content-primary)' }}>
          import them from your computer
        </u>
      </span>
    ),
    activeDragContent: 'Upload file(s)',
    onUpload: (e) => action('upload')(e),
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '360px' }}>
      <Upload {...args} />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
  render: Default.render,
};

export const InADisabledFieldset: Story = {
  render: (args) => (
    <div style={{ maxWidth: '360px' }}>
      <fieldset disabled>
        <Upload {...args} />
      </fieldset>
    </div>
  ),
};

export const Illustration: Story = {
  args: {
    illustration: <img src="images/illustration.webp" alt="" />,
  },
  render: Default.render,
};

export const AcceptSpecificFileTypes: Story = {
  args: {
    accept: 'image/*',
  },
  render: Default.render,
};

export const ExpandedHeight: Story = {
  render: (args) => (
    <div style={{ maxWidth: '360px' }}>
      <Upload {...args} className={styles.expandedHeight} />
    </div>
  ),
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        Invalid,
        InADisabledFieldset,
        Illustration,
        AcceptSpecificFileTypes,
        ExpandedHeight,
      ]}
      meta={meta}
    />
  ),
};
