import { render, screen } from '@testing-library/react';
import React from 'react';

import { Table } from './';

type Supplier = {
  id: number;
  supplierName: string;
  amount: string;
};

describe('Table.Mini component', () => {
  const data: Supplier[] = [
    {
      id: 0,
      supplierName: 'Supplier1',
      amount: '2€',
    },
    {
      id: 1,
      supplierName: 'Supplier2',
      amount: '324$',
    },
    {
      id: 2,
      supplierName: 'Supplier3',
      amount: '20$',
    },
  ];

  it('displays an accessible table', () => {
    render(
      <Table.Mini
        columns={[
          {
            id: 'supplierName',
            renderCell: (cell) => cell.supplierName,
          },
          {
            id: 'amount',
            align: 'right',
            renderCell: (cell) => cell.amount,
          },
        ]}
        data={data}
        getRowId={(row) => String(row.id)}
      />,
    );

    expect(screen.getByRole('table')).toBeVisible();

    // Expect 3 rows from the data
    expect(screen.getAllByRole('row', { name: /supplier\d/i })).toHaveLength(3);

    // Each row has 2 cells, expect 6 cells in total
    expect(screen.getAllByRole('cell')).toHaveLength(6);
  });
});
