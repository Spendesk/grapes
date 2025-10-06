import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { userEvent } from 'storybook/test';
import React, { useState } from 'react';

import { SwitchField } from '../SwitchField';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof SwitchField> = {
  title: 'Form/SwitchField',
  component: SwitchField,
  args: {
    label: 'Include receipt',
    onChange: (e) => {
      action('onChange')(e);
    },
  },
  parameters: {
    docs: { source: { type: 'auto' } },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchField>;

export const Default: Story = {
  render: (args) => {
    const [isChecked, setChecked] = useState(false);
    return (
      <SwitchField
        {...args}
        isChecked={isChecked}
        onChange={(e) => {
          action('onChange')(e);
          setChecked(e.target.checked);
        }}
      />
    );
  },
};

export const FocusVisibleState: Story = {
  ...Default,
  play: async () => {
    await userEvent.tab();
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const DisabledAndChecked: Story = {
  args: {
    isDisabled: true,
    isChecked: true,
  },
};

export const InADisabledFieldset: Story = {
  args: {
    isChecked: true,
  },
  render: (args) => (
    <fieldset disabled>
      <SwitchField {...args} />
    </fieldset>
  ),
};

export const ParentFit: Story = {
  args: {
    isChecked: false,
    fit: 'parent',
  },
};

export const WithHelpText: Story = {
  args: {
    isChecked: false,
    helpText: 'You can include this option if you want to see the active style',
  },
};

export const WithHelpTextDisabled: Story = {
  args: {
    helpText: 'You can include this option if you want to see the active style',
    isDisabled: true,
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
        FocusVisibleState,
        Disabled,
        DisabledAndChecked,
        InADisabledFieldset,
        ParentFit,
        WithHelpText,
        WithHelpTextDisabled,
      ]}
      meta={meta}
    />
  ),
};
