import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';
import React, { useState } from 'react';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

import { FormField } from '../../FormField';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { DatePicker } from '../DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  args: {
    fit: 'parent',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open calendar' }),
    );
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div>
        <FormField label="Start date:">
          <DatePicker {...args} value={date} onChange={setDate} />
        </FormField>
        <Button
          variant="tertiaryNeutral"
          onClick={() => setDate(undefined)}
          text="Reset Date"
        />
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  play: Default.play,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date('2021-01-01'));
    return (
      <FormField label="Start date">
        <DatePicker {...args} value={date} onChange={setDate} />
      </FormField>
    );
  },
};

export const WithMinAndMaxDate: Story = {
  play: Default.play,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2021, 6, 15));
    const minDate = new Date(2021, 6, 3);
    const maxDate = new Date(2021, 6, 20);
    return (
      <FormField label="Date between a range">
        <DatePicker
          {...args}
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </FormField>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2021, 6, 15));
    return (
      <FormField label={`Date: ${date ? date.toString() : ''}`}>
        <DatePicker {...args} value={date} onChange={setDate} />
      </FormField>
    );
  },
};

export const InADisabledFieldset: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2021, 6, 15));
    return (
      <fieldset disabled>
        <FormField label={`Date: ${date ? date.toString() : ''}`}>
          <DatePicker {...args} value={date} onChange={setDate} />
        </FormField>
      </fieldset>
    );
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2021, 6, 15));
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const InAnInvalidFormField: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2021, 6, 15));
    return (
      <FormField
        label={`Date: ${date ? date.toString() : ''}`}
        alertMessage="Invalid date"
      >
        <DatePicker {...args} value={date} onChange={setDate} />
      </FormField>
    );
  },
};

export const MagicGradient: Story = {
  args: {
    variant: 'magicGradient',
    fit: 'content',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2021, 6, 15));
    return (
      <div style={{ width: 400 }}>
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

export const WithLeftAddon: Story = {
  args: {
    fit: 'content',
    leftAddon: (
      <div style={{ marginLeft: '8px', marginTop: '4px' }}>
        <Icon name="robot" />
      </div>
    ),
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date(2021, 6, 15));
    return (
      <div style={{ width: 400 }}>
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
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
        WithDefaultValue,
        WithMinAndMaxDate,
        Disabled,
        InADisabledFieldset,
        Invalid,
        InAnInvalidFormField,
        MagicGradient,
        WithLeftAddon,
      ]}
      meta={meta}
    />
  ),
};
