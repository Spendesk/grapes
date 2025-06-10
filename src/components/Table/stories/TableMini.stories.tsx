import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { type TableMiniColumn } from '../TableMini';
import { Table } from '../Table';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

interface DataRow {
  id: number;
  accountPayable: string;
  supplierName: string;
  amount: string;
}
const data: DataRow[] = [
  {
    id: 0,
    accountPayable: '401AIRBNB',
    supplierName: 'Airbnb',
    amount: '2€',
  },
  {
    id: 1,
    accountPayable: '401DELOITTE',
    supplierName: 'Deloitte',
    amount: '324$',
  },
  {
    id: 2,
    accountPayable: '401MAILCHIMP',
    supplierName: 'Mailchimp',
    amount: '13.29€',
  },
  {
    id: 3,
    accountPayable: '401APPLE',
    supplierName: 'Apple',
    amount: '0€',
  },
];

const columns: TableMiniColumn<DataRow>[] = [
  {
    id: 'accountPayable',
    renderCell: ({ accountPayable }) => accountPayable,
  },
  {
    id: 'supplierName',
    renderCell: ({ supplierName }) => supplierName,
  },
  {
    id: 'amount',
    align: 'right',
    width: '20%',
    renderCell(row) {
      return <span style={{ fontWeight: 500 }}>{row.amount}</span>;
    },
  },
];

const meta: Meta<typeof Table.Mini<DataRow>> = {
  title: 'Data display/TableMini',
  component: Table.Mini,
  args: {
    columns,
    data,
    getRowId: (row: DataRow) => String(row.id),
  },
};

export default meta;
type Story = StoryObj<typeof Table.Mini<DataRow>>;

export const Default: Story = {};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => <SnapshotContainer stories={[Default]} meta={meta} />,
};
