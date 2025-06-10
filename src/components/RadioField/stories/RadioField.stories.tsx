import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { useState } from 'react';

import { RadioField, RadioFieldProps } from '../RadioField';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof RadioField> = {
  title: 'Form/RadioField',
  component: RadioField,
  args: {
    value: 'approval-needed',
    label: 'Approval Needed',
    onChange: (e) => {
      action('onChange')(e);
    },
  },
};

const Template = (props: RadioFieldProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <RadioField
      {...props}
      isChecked={isChecked}
      onChange={(e) => {
        action('onChange')(e);
        setIsChecked(true);
      }}
    />
  );
};

export default meta;
type Story = StoryObj<typeof RadioField>;

export const Default: Story = {
  args: {
    name: 'Default',
  },
  render: Template,
};

export const Checked: Story = {
  args: {
    name: 'Checked',
    isChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'Disabled',
    isDisabled: true,
  },
};

export const DisabledAndChecked: Story = {
  args: {
    name: 'DisabledAndChecked',
    isDisabled: true,
    isChecked: true,
  },
};

export const InADisabledFieldset: Story = {
  render: (args) => (
    <fieldset disabled>
      <RadioField {...args} name="InADisabledFieldset" />
    </fieldset>
  ),
};

export const InADisabledFieldsetAndChecked: Story = {
  args: {
    name: 'InADisabledFieldsetAndChecked',
    isChecked: true,
  },
  render: InADisabledFieldset.render,
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
      ]}
      meta={meta}
    />
  ),
};
