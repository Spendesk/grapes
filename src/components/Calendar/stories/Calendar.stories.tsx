import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from '../Calendar';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';
import React from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Data display/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  globals: {
    locale: 'en-US',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    value: new Date(2022, 1, 15),
  },
};

export const WithMaxAndMinDate: Story = {
  args: {
    value: new Date(2022, 1, 15),
    maxDate: new Date(2022, 1, 25),
    minDate: new Date(2022, 1, 5),
  },
};

export const FrenchCalendar: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  globals: {
    locale: 'fr-FR',
  },
  args: {
    value: new Date(2024, 11, 15),
  },
};

export const UKCalendar: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  globals: {
    locale: 'en-UK',
  },
  args: {
    value: new Date(2022, 1, 15),
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer stories={[Default, WithMaxAndMinDate]} meta={meta} />
  ),
};
