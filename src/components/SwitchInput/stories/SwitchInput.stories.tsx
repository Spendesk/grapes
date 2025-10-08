import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { useState } from 'react';

import { SwitchInput } from '../SwitchInput';

const meta: Meta<typeof SwitchInput> = {
  title: 'Form/SwitchInput',
  component: SwitchInput,
};

export default meta;
type Story = StoryObj<typeof SwitchInput>;

export const Default: Story = {
  render: (args) => {
    const [isChecked, setChecked] = useState(false);
    return (
      <SwitchInput
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

export const Checked: Story = {
  render: (args) => {
    const [isChecked, setChecked] = useState(true);
    return (
      <SwitchInput
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
  render: (args) => (
    <fieldset disabled>
      <SwitchInput {...args} />
    </fieldset>
  ),
};
