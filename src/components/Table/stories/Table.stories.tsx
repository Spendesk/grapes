/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Button } from '../../Button';
import { Table } from '../Table';
import { IconButton } from '../../IconButton';
import type { TableColumn } from '../types';
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

const moreData: DataRow[] = [
  {
    id: 0,
    accountPayable: '401DELOITTE',
    supplierName: 'Deloitte GmbH',
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
    accountPayable: '401MAILCHIMP',
    supplierName: 'Mailchimp',
    amount: '45.2€',
  },
  {
    id: 4,
    accountPayable: '401APPLE',
    supplierName: 'Apple',
    amount: '0€',
  },
];

const columns: TableColumn<DataRow>[] = [
  {
    id: 'accountPayable',
    header: 'Account payable',
    renderCell: ({ accountPayable }) => accountPayable,
  },
  {
    id: 'supplierName',
    header: 'Supplier name',
    renderCell: ({ supplierName }) => supplierName,
  },
  {
    id: 'amount',
    header: 'Amount',
    align: 'right',
    width: '20%',
    renderCell(row) {
      return <span style={{ fontWeight: 500 }}>{row.amount}</span>;
    },
  },
];

const meta: Meta<typeof Table<DataRow>> = {
  title: 'Data display/Table',
  component: Table,
  args: {
    columns,
    data,
    getRowId: (row: DataRow) => String(row.id),
  },
};

export default meta;
type Story = StoryObj<typeof Table<DataRow>>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    rowHeight: 'compact',
  },
};

export const GroupBy: Story = {
  args: {
    data: moreData,
    groupBy: (row) => row.accountPayable,
    renderGroupedRowHeader(value, aggregatedOptions) {
      return <p>{`${value} ${aggregatedOptions.length}`}</p>;
    },
  },
};

export const Clickable: Story = {
  render: (args) => {
    const [activeRow, setActiveRow] = useState<number>();

    return (
      <Table
        {...args}
        onRowClick={(row) => setActiveRow(row.id)}
        getIsRowActive={(row) => row.id === activeRow}
      />
    );
  },
};

export const WithActiveRows: Story = {
  args: {
    getIsRowActive: (row: DataRow) => row.id === 0 || row.id === 2,
  },
};

export const WithDisabledRows: Story = {
  args: {
    getIsRowDisabled: (row: DataRow) => row.id === 0 || row.id === 2,
  },
};

export const WithCheckableRows: Story = {
  args: {
    getIsRowCheckable: (row: DataRow) => row.id !== 0 && row.id !== 2,
  },
};

export const WithSort: Story = {
  args: {
    columns: [
      {
        id: 'accountPayable',
        header: 'Account payable',
        renderCell: ({ accountPayable }) => accountPayable,
        getSortValue: (item) => item.accountPayable,
      },
      {
        id: 'supplierName',
        header: 'Supplier name',
        renderCell: ({ supplierName }) => supplierName,
      },
      {
        id: 'amount',
        header: 'Amount',
        align: 'right',
        width: '20%',
        renderCell(row) {
          return <span style={{ fontWeight: 500 }}>{row.amount}</span>;
        },
        getSortValue: (item) => parseInt(item.amount),
      },
    ],
  },
};

export const WithFooter: Story = {
  args: {
    footer: <Button variant="secondaryNeutral" text="Load more" />,
  },
};

export const WithScroll: Story = {
  args: {
    maxHeight: 280,
    footer: <Button variant="secondaryNeutral" text="Load more" />,
    data: [
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
      {
        id: 4,
        accountPayable: '401MONOP',
        supplierName: 'Monoprix',
        amount: '15€',
      },
      {
        id: 5,
        accountPayable: '401SLACK',
        supplierName: 'Slack',
        amount: '310€',
      },
      {
        id: 6,
        accountPayable: '401AMAZON',
        supplierName: 'Amazon',
        amount: '200€',
      },
      {
        id: 7,
        accountPayable: '40115FIVE',
        supplierName: '15Five',
        amount: '155€',
      },
    ],
  },
};

export const WithRowVariant: Story = {
  args: {
    getRowVariant: ({ supplierName }) => {
      if (supplierName === 'Airbnb') return 'warning';
      if (supplierName === 'Mailchimp') return 'info';
      return undefined;
    },
  },
};

const getCellVariant = ({ supplierName }: DataRow) => {
  switch (supplierName) {
    case 'Mailchimp':
      return 'alert';
    case 'Airbnb':
      return 'primary';
    default:
      return undefined;
  }
};

export const WithCellVariant: Story = {
  args: {
    columns: [
      {
        id: 'accountPayable',
        header: 'Account payable',
        renderCell: ({ accountPayable }) => accountPayable,
        getCellVariant: ({ accountPayable }) => {
          switch (accountPayable) {
            case '401AIRBNB':
              return 'success';
            case '401APPLE':
              return 'info';

            default:
              return undefined;
          }
        },
      },
      {
        id: 'supplierName',
        header: 'Supplier name',
        renderCell: (row) => {
          const { supplierName } = row;
          return (
            <>
              <span style={{ display: 'inline-block', marginRight: '12px' }}>
                {getCellVariant(row) === 'alert' ? '❌' : '👌'}
              </span>
              {supplierName}
            </>
          );
        },
        getCellVariant,
      },
      {
        id: 'amount',
        header: 'Amount',
        align: 'right',
        width: '20%',
        renderCell({ amount }) {
          return <span style={{ fontWeight: 500 }}>{amount}</span>;
        },
        getCellVariant: ({ amount }) =>
          amount === '324$' ? 'warning' : undefined,
      },
    ],
  },
};

export const WithEmptyStateAndNoData: Story = {
  args: {
    data: [],
    emptyState: {
      title: 'There are no payables in this story',
      subtitle: 'Try looking in another story',
    },
  },
};

export const Selectable: Story = {
  render: (args) => {
    const [selectedRowIds, setSelectedRowsIds] = useState<string[]>([]);
    return (
      <Table
        {...args}
        selectedRowIds={selectedRowIds}
        onRowSelectionChange={(_, id, checked) => {
          setSelectedRowsIds((options) => {
            if (checked) {
              return options.concat(id);
            }
            return options.filter((optionId) => optionId !== id);
          });
        }}
        onAllRowsSelectionChange={(_, ids, checked) => {
          setSelectedRowsIds(checked ? ids : []);
        }}
      />
    );
  },
};

export const SelectableAndDisabled: Story = {
  render: (args) => {
    const [selectedRowIds, setSelectedRowsIds] = useState<string[]>([]);
    return (
      <Table
        {...args}
        selectedRowIds={selectedRowIds}
        onRowSelectionChange={(_, id, checked) => {
          setSelectedRowsIds((options) => {
            if (checked) {
              return options.concat(id);
            }
            return options.filter((optionId) => optionId !== id);
          });
        }}
        onAllRowsSelectionChange={(_, ids, checked) => {
          setSelectedRowsIds(checked ? ids : []);
        }}
        getIsRowDisabled={(row) => row.id === 1}
      />
    );
  },
};

export const WithRowHovered: Story = {
  args: {
    columns: [
      {
        id: 'accountPayable',
        header: 'Account payable',
        renderCell: ({ accountPayable }) => accountPayable,
      },
      {
        id: 'supplierName',
        header: 'Supplier name',
        renderCell: ({ supplierName }) => supplierName,
      },
      {
        id: 'amount',
        header: '',
        align: 'right',
        width: '20%',
        renderCell(row, { isRowHovered }) {
          return isRowHovered ? (
            <IconButton
              iconName="pen"
              onClick={() => console.log('edit')}
              aria-label="Edit"
            />
          ) : (
            <div></div>
          );
        },
      },
    ],
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
        Compact,
        Clickable,
        WithActiveRows,
        WithDisabledRows,
        WithCheckableRows,
        WithSort,
        WithFooter,
        WithScroll,
        WithRowVariant,
        WithCellVariant,
        WithEmptyStateAndNoData,
        Selectable,
        SelectableAndDisabled,
        WithRowHovered,
        GroupBy,
      ]}
      meta={meta}
    />
  ),
};
