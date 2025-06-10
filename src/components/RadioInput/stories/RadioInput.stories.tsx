/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { useState } from 'react';

import { RadioInput } from '../RadioInput';

const meta: Meta<typeof RadioInput> = {
  title: 'Form/RadioInput',
  component: RadioInput,
  args: {
    value: 'my-radio',
    onChange: (e) => {
      action('onChange')(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioInput>;

export const Default: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <RadioInput
        {...args}
        isChecked={isChecked}
        onChange={(e) => {
          action('onChange')(e);
          setIsChecked(true);
        }}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
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
  render: (args) => (
    <fieldset disabled>
      <RadioInput {...args} />
    </fieldset>
  ),
};
export const InADisabledFieldsetAndChecked: Story = {
  args: {
    isChecked: true,
  },
  render: InADisabledFieldset.render,
};
