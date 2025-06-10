/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { FormField } from '../FormField';
import { TextInput } from '../../TextInput';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof FormField> = {
  title: 'Form/FormField',
  component: FormField,
  args: {
    label: 'Your name',
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <FormField {...args}>
        <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
      </FormField>
    );
  },
};

export const WithDescription: Story = {
  args: {
    description:
      'This is an optional description. Provide a hint message to guide user.',
  },
  render: Default.render,
};

export const WithHint: Story = {
  args: {
    hint: 'Optional',
  },
  render: Default.render,
};

export const WithInfoTipContent: Story = {
  args: {
    infoTipContent: 'Some useful information to make your life easier.',
  },
  render: Default.render,
};

export const WithErrorMessage: Story = {
  args: {
    alertMessage: 'This information is required.',
  },
  render: Default.render,
};

export const WithWarningMessage: Story = {
  args: {
    warningMessage: 'It looks like this is not your real name.',
  },
  render: Default.render,
};
export const WithVisuallyHiddenLabel: Story = {
  args: {
    visuallyHideLabel: true,
  },
  render: Default.render,
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        WithHint,
        WithDescription,
        WithInfoTipContent,
        WithErrorMessage,
        WithWarningMessage,
        WithWarningMessage,
        WithVisuallyHiddenLabel,
      ]}
      meta={meta}
    />
  ),
};
