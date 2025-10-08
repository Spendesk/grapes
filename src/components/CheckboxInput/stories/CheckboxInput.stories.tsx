import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { useState } from 'react';

import { CheckboxInput } from '../CheckboxInput';

const meta: Meta<typeof CheckboxInput> = {
  title: 'Form/CheckboxInput',
  component: CheckboxInput,
  args: {
    onChange: (e) => {
      action('onChange')(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxInput>;

export const Default: Story = {
  args: {
    isChecked: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.isChecked);
    return (
      <CheckboxInput
        isChecked={checked}
        onChange={(e) => {
          action('onChange')(e);
          setChecked(e.target.checked);
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    isChecked: false,
  },
};
export const DisabledAndChecked: Story = {
  args: {
    isDisabled: true,
    isChecked: true,
  },
};
export const InADisabledFieldset: Story = {
  args: {},
  render: (args) => (
    <fieldset disabled>
      <CheckboxInput {...args} />
    </fieldset>
  ),
};
export const InADisabledFieldsetAndChecked: Story = {
  ...InADisabledFieldset,
  args: {
    isChecked: true,
  },
};
export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
};
