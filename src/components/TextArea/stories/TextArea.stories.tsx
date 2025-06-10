import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { TextArea } from '../TextArea';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof TextArea> = {
  title: 'Form/TextArea',
  component: TextArea,
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
    onKeyDown: action('onKeyDown'),
  },
};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Describe your expense',
  },
};
export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    value: 'Describe your expense',
  },
};
export const InADisabledFieldset: Story = {
  args: {
    ...Default.args,
    value: 'Describe your expense',
  },
  render: (args) => (
    <fieldset disabled>
      <TextArea {...args} />
    </fieldset>
  ),
};
export const Invalid: Story = {
  args: {
    ...Default.args,
    isInvalid: true,
  },
};
export const ReadOnly: Story = {
  args: {
    ...Default.args,
    isReadOnly: true,
    value: 'Describe your expense',
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
        WithPlaceholder,
        Disabled,
        InADisabledFieldset,
        Invalid,
        ReadOnly,
      ]}
      meta={meta}
    />
  ),
};
