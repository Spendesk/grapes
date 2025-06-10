import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { UploadButton } from '../UploadButton';

const meta: Meta<typeof UploadButton> = {
  title: 'Form/UploadButton',
  component: UploadButton,
  args: {
    text: 'Upload file(s)',
    onUpload: (e) => {
      action('onUpload')(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof UploadButton>;

export const PrimaryBrand: Story = {
  args: {
    variant: 'primaryBrand',
  },
};

export const PrimaryInfo: Story = {
  args: {
    variant: 'primaryInfo',
  },
};

export const PrimaryWarning: Story = {
  args: {
    variant: 'primaryWarning',
  },
};

export const PrimaryAlert: Story = {
  args: {
    variant: 'primaryAlert',
  },
};

export const TertiaryNeutral: Story = {
  args: {
    variant: 'tertiaryNeutral',
  },
};

export const ContentFit: Story = {
  args: {
    fit: 'content',
  },
};

export const ParentFit: Story = {
  args: {
    fit: 'parent',
  },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <UploadButton {...args} />
    </div>
  ),
};

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const InADisabledFieldset: Story = {
  render: (args) => (
    <fieldset disabled>
      <UploadButton {...args} />
    </fieldset>
  ),
};

export const AcceptSpecificFileTypes: Story = {
  args: {
    accept: 'image/*',
  },
};

export const MultipleFiles: Story = {
  args: {
    isMultiple: true,
  },
};

export const AsyncOnUploadHandler: Story = {
  args: {
    onUpload: (e) => {
      action('onUpload')(e);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
    },
  },
};

export const WithAnIconOnTheLeft: Story = {
  args: {
    iconName: 'circle-plus',
    iconPosition: 'left',
  },
};
