import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React, { type ChangeEvent, useState } from 'react';

import { RadioGroup } from '../RadioGroup';
import { RadioField } from '../../RadioField';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

type Option = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

const options: Option[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'yearly', label: 'Yearly' },
];

export const Default: Story = {
  args: {
    name: 'row',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      action('onChange')(event);
      setSelectedValue(event.target.value);
    };

    return (
      <RadioGroup
        name={args.name}
        value={selectedValue}
        onChange={handleChange}
        direction={args.direction}
      >
        {options.map((props) => (
          <RadioField {...props} key={props.value} />
        ))}
      </RadioGroup>
    );
  },
};

export const DirectionColumn: Story = {
  args: {
    name: 'column',
    direction: 'column',
  },
  render: Default.render,
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer stories={[Default, DirectionColumn]} meta={meta} />
  ),
};
