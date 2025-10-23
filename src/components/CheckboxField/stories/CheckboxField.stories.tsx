import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { useState } from 'react';

import { CheckboxField } from '../CheckboxField';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof CheckboxField> = {
  title: 'Form/CheckboxField',
  args: {
    onChange: (e) => {
      action('onChange')(e);
    },
  },
  component: CheckboxField,
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  args: {
    isChecked: false,
    label: 'Include receipt',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.isChecked);
    return (
      <CheckboxField
        {...args}
        isChecked={checked}
        onChange={(e) => {
          action('onChange')(e);
          setChecked(e.target.checked);
        }}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    label: 'Include receipt',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Include receipt',
  },
};
export const DisabledAndChecked: Story = {
  args: {
    isDisabled: true,
    isChecked: true,
    label: 'Include receipt',
  },
};
export const InADisabledFieldset: Story = {
  args: {
    label: 'Include receipt',
  },
  render: (args) => (
    <fieldset disabled>
      <CheckboxField {...args} />
    </fieldset>
  ),
};
export const InADisabledFieldsetAndChecked: Story = {
  ...InADisabledFieldset,
  args: {
    label: 'Include receipt',
    isChecked: true,
  },
};
export const Indeterminate: Story = {
  args: {
    label: 'Include receipt',
    isIndeterminate: true,
  },
};
export const ContentFit: Story = {
  args: {
    isChecked: false,
    label: 'Include receipt',
    fit: 'content',
  },
};
export const ParentFit: Story = {
  args: {
    isChecked: false,
    label: 'Include receipt',
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
        Default,
        Checked,
        Disabled,
        DisabledAndChecked,
        InADisabledFieldset,
        InADisabledFieldsetAndChecked,
        Indeterminate,
        ContentFit,
        ParentFit,
      ]}
      meta={meta}
    />
  ),
};
