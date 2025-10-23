import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { useState } from 'react';

import { Input } from '../Input';
import { Button } from '../../Button';

const meta: Meta<typeof Input> = {
  title: 'Form/Generic input',
  component: Input,
  args: {
    placeholder: 'Type something here',
    onChange: (e) => {
      action('onChange')(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Readonly: Story = {
  args: {
    isReadOnly: true,
    value: 'Readonly text',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: 'Disabled text',
  },
};

export const InADisabledFieldset: Story = {
  args: {
    value: 'Disabled text',
  },
  render: (args) => (
    <fieldset disabled>
      <Input {...args} />
    </fieldset>
  ),
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

export const LeftAlignedText: Story = {
  args: {
    textAlign: 'left',
  },
};

export const CenterAlignedText: Story = {
  args: {
    textAlign: 'center',
  },
};

export const RightAlignedText: Story = {
  args: {
    textAlign: 'right',
  },
};

export const ParentFit: Story = {
  args: {
    fit: 'parent',
  },
};

export const NumberInputWithMinAndMax: Story = {
  args: {
    fit: 'parent',
    type: 'number',
    placeholder: 'Type a number here',
    min: 2,
    max: 6,
  },
  render: (args) => {
    const [value, setValue] = useState(4);
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          action('onChange')(e);
          setValue(e.target.valueAsNumber);
        }}
      />
    );
  },
};
