import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { useState } from 'react';
import { CheckboxBox, type CheckboxBoxProps } from '../CheckboxBox';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof CheckboxBox> = {
  title: 'Form/CheckboxBox',
  component: CheckboxBox,
  args: {
    label: 'Checkbox label',
    description:
      'This is the optional and concise description of the Checkbox Box which helps to add some info and context to our users.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CheckboxBox>;

const Template = (props: CheckboxBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CheckboxBox
      {...props}
      isChecked={isChecked}
      onChange={(e) => {
        action('onChange')(e);
        setIsChecked(e.target.checked);
      }}
    />
  );
};

export const Default: Story = {
  render: Template,
};

export const Checked: Story = {
  args: {
    isChecked: true,
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

export const WithoutDescription: Story = {
  args: {
    description: null,
    isChecked: true,
  },
};

export const WithIcon: Story = {
  args: {
    iconName: 'calendar',
    isChecked: false,
  },
};

export const WithIconWithoutDescription: Story = {
  args: {
    iconName: 'calendar',
    description: null,
    isChecked: false,
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
        WithoutDescription,
        WithIcon,
        WithIconWithoutDescription,
      ]}
      meta={meta}
    />
  ),
};
