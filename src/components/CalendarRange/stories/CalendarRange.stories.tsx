/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import { CalendarRange, type DateRange } from '../CalendarRange';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';
import React, { useState } from 'react';

const meta: Meta<typeof CalendarRange> = {
  title: 'Data display/CalendarRange',
  component: CalendarRange,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CalendarRange>;

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>([
      new Date(2023, 1, 15),
      new Date(2023, 1, 17),
    ]);
    return (
      <CalendarRange
        value={range}
        onClick={(range) => {
          setRange(range);
        }}
      />
    );
  },
};

export const MinAndMaxDate: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>([
      new Date(2022, 2, 19),
      new Date(2022, 3, 10),
    ]);
    return (
      <CalendarRange
        value={range}
        minDate={new Date(2022, 1, 15)}
        maxDate={new Date(2022, 3, 15)}
        onClick={(range) => {
          setRange(range);
        }}
      />
    );
  },
};

export const SingleCalendar: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>([
      new Date(2023, 1, 15),
      new Date(2023, 1, 17),
    ]);
    return (
      <CalendarRange
        value={range}
        numberOfCalendars={1}
        onClick={(range) => {
          setRange(range);
        }}
      />
    );
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Default, MinAndMaxDate, SingleCalendar]}
      meta={meta}
    />
  ),
};
