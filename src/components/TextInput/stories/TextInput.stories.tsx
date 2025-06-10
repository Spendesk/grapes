import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { TextInput } from '../TextInput';
import { Button } from '../../Button';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof TextInput> = {
  title: 'Form/TextInput',
  component: TextInput,
  args: {
    placeholder: 'Enter account number',
    onChange: (e) => {
      action('onChange')(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const ParentFit: Story = {
  args: {
    fit: 'parent',
  },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <TextInput {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: '02334234',
    placeholder: 'Enter account number',
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    value: '02334234',
  },
};

export const InADisabledFieldset: Story = {
  args: {
    value: '02334234',
  },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <fieldset disabled>
        <TextInput {...args} />
      </fieldset>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
};

export const MagicGradient: Story = {
  args: {
    variant: 'magicGradient',
  },
};

export const WithLeftAddon: Story = {
  args: {
    leftAddon: <Button variant="tertiaryNeutral" text="OK" />,
  },
};

export const WithRightAddon: Story = {
  args: {
    rightAddon: <Button variant="tertiaryNeutral" text="OK" />,
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
        ParentFit,
        ReadOnly,
        Disabled,
        InADisabledFieldset,
        Invalid,
        MagicGradient,
        WithLeftAddon,
        WithRightAddon,
      ]}
      meta={meta}
    />
  ),
};
