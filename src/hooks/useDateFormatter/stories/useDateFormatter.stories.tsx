import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import {
  useDateFormatter,
  DATE_FORMAT,
  type DateFormat,
} from '../useDateFormatter';

const meta: Meta<{ format: DateFormat; options: Intl.DateTimeFormatOptions }> =
  {
    title: 'Data display/useDateFormatter',
    argTypes: {
      format: {
        options: Object.values(DATE_FORMAT),
        description: 'The date format to use',
        control: { type: 'select' },
        table: {
          defaultValue: { summary: 'MEDIUM' },
          type: {
            summary: DATE_FORMAT.LONG_WITH_TIME,
          },
        },
      },
      options: {
        description: 'Options to use in case DATE_FORMAT.CUSTOM is used',
        control: { type: 'object' },
        table: {
          defaultValue: { summary: '{}' },
          type: {
            summary: 'Intl.DateTimeFormatOptions',
          },
        },
      },
    },
  };

export default meta;
type Story = StoryObj<{
  format: DateFormat;
  options: Intl.DateTimeFormatOptions;
}>;

export const Default: Story = {
  args: { format: DATE_FORMAT.MEDIUM },
  render: (args) => {
    const dateFormatter = useDateFormatter();

    return (
      <div>
        <p>{dateFormatter(new Date(), args.format, args.options)}</p>
      </div>
    );
  },
};

export const AdvancedSettings: Story = {
  args: {
    format: DATE_FORMAT.CUSTOM,
    options: { day: '2-digit', month: '2-digit' },
  },
  render: (args) => {
    const dateFormatter = useDateFormatter();

    return (
      <div>
        <p>{dateFormatter(new Date(), args.format, args.options)}</p>
      </div>
    );
  },
};
