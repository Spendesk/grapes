import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Table } from './';
import { Button } from '../Button';

type Supplier = {
  id: number;
  supplierName: string;
  amount: string;
};

describe('Table component', () => {
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
      <Table
        columns={[
          {
            id: 'supplierName',
            header: 'Supplier name',
            renderCell: (cell) => cell.supplierName,
          },
          {
            id: 'amount',
            header: 'Amount',
            align: 'right',
            renderCell: (cell) => cell.amount,
          },
        ]}
        data={data}
        getRowId={(row) => String(row.id)}
      />,
    );

    expect(screen.getByRole('table')).toBeVisible();
    expect(
      screen.getByRole('columnheader', { name: 'Supplier name' }),
    ).toBeVisible();
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toBeVisible();

    // Expect 3 rows from the data
    expect(screen.getAllByRole('row', { name: /supplier\d/i })).toHaveLength(3);

    // Each row has 2 cells, expect 6 cells in total
    expect(screen.getAllByRole('cell')).toHaveLength(6);
  });

  describe('given no data', () => {
    it('given `emptyState`, displays empty state', () => {
      render(
        <Table
          columns={[
            {
              id: 'supplierName',
              header: 'Supplier name',
              renderCell: (cell) => cell.supplierName,
            },
            {
              id: 'amount',
              header: 'Amount',
              align: 'right',
              renderCell: (cell) => cell.amount,
            },
          ]}
          data={[] as Supplier[]}
          getRowId={(row) => String(row.id)}
          emptyState={{
            title: 'Empty state title',
            subtitle: 'Empty state substitle',
          }}
        />,
      );

      expect(screen.getByRole('table')).toBeVisible();
      expect(screen.getByText('Empty state title')).toBeVisible();
      expect(screen.getByText('Empty state substitle')).toBeVisible();
    });

    it('displays an empty table', () => {
      render(
        <Table
          columns={[
            {
              id: 'supplierName',
              header: 'Supplier name',
              renderCell: (cell) => cell.supplierName,
            },
            {
              id: 'amount',
              header: 'Amount',
              align: 'right',
              renderCell: (cell) => cell.amount,
            },
          ]}
          data={[] as Supplier[]}
          getRowId={(row) => String(row.id)}
        />,
      );

      expect(screen.getByRole('table')).toBeVisible();

      // Only the top row should be in the DOM
      expect(screen.getAllByRole('row')).toHaveLength(1);
    });
  });

  it('given `onRowClick` props, calls `onRowClick` when clicking on the first row', async () => {
    const handleClick = vi.fn();
    render(
      <Table
        columns={[
          {
            id: 'supplierName',
            header: 'Supplier name',
            renderCell: (cell) => cell.supplierName,
          },
        ]}
        data={data}
        getRowId={(row) => String(row.id)}
        onRowClick={handleClick}
      />,
    );

    await userEvent.click(screen.getByRole('row', { name: 'Supplier1' }));
    expect(handleClick).toHaveBeenCalledWith({
      id: 0,
      amount: '2€',
      supplierName: 'Supplier1',
    });

    await userEvent.click(screen.getByRole('row', { name: 'Supplier2' }));
    expect(handleClick).toHaveBeenCalledWith({
      id: 1,
      supplierName: 'Supplier2',
      amount: '324$',
    });
  });

  it('supports footer', () => {
    render(
      <Table
        columns={[
          {
            id: 'supplierName',
            header: 'Supplier name',
            renderCell: (cell) => cell.supplierName,
          },
        ]}
        data={data}
        getRowId={(row) => String(row.id)}
        footer={<Button variant="secondaryNeutral" text="Load more" />}
      />,
    );

    expect(screen.getByRole('button', { name: 'Load more' })).toBeVisible();
  });

  it('renders the expected content when hovered', async () => {
    render(
      <Table
        columns={[
          {
            id: 'supplierName',
            header: 'Supplier name',
            renderCell: (cell, { isRowHovered }) => {
              return isRowHovered ? "I'm hovered!" : cell.supplierName;
            },
          },
        ]}
        data={data}
        getRowId={(row) => String(row.id)}
      />,
    );

    expect(screen.getByRole('cell', { name: 'Supplier1' })).toBeVisible();
    expect(
      screen.queryByRole('cell', { name: "I'm hovered!" }),
    ).not.toBeInTheDocument();

    await userEvent.hover(screen.getByRole('cell', { name: 'Supplier1' }));

    expect(
      await screen.findByRole('cell', { name: "I'm hovered!" }),
    ).toBeVisible();
    expect(
      screen.queryByRole('cell', { name: 'Supplier1' }),
    ).not.toBeInTheDocument();

    await userEvent.unhover(screen.getByRole('cell', { name: "I'm hovered!" }));

    expect(screen.getByRole('cell', { name: 'Supplier1' })).toBeVisible();
    expect(
      screen.queryByRole('cell', { name: "I'm hovered!" }),
    ).not.toBeInTheDocument();
  });

  it('takes into account new data', async () => {
    const Wrapper = ({ items }: { items: typeof data }) => {
      return (
        <Table
          columns={[
            {
              id: 'supplierName',
              header: 'Supplier name',
              renderCell: (cell) => cell.supplierName,
              getSortValue: (item) => item.supplierName,
            },
          ]}
          data={items}
          getRowId={(row) => String(row.id)}
        />
      );
    };
    const { rerender } = render(<Wrapper items={data} />);

    // go to descending order
    await userEvent.click(
      screen.getByRole('columnheader', { name: 'Supplier name' }),
    );

    rerender(
      <Wrapper
        items={[...data, { id: 0, supplierName: 'Supplier4', amount: '3€' }]}
      />,
    );

    // Expect lines to have been sorted by descending order
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier4');
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier3');
    expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier2');
    expect(screen.getAllByRole('cell')[3]).toHaveTextContent('Supplier1');
  });

  describe('given `onSort` props', () => {
    it('displays the sort icon', async () => {
      const Wrapper = () => {
        return (
          <Table
            columns={[
              {
                id: 'supplierName',
                header: 'Supplier name',
                renderCell: (cell) => cell.supplierName,
                getSortValue: (item) => item.supplierName,
              },
            ]}
            data={[
              {
                id: 0,
                supplierName: 'Supplier2',
                amount: '2€',
              },
              {
                id: 1,
                supplierName: 'Supplier1',
                amount: '324$',
              },
              {
                id: 2,
                supplierName: 'Supplier3',
                amount: '20$',
              },
            ]}
            getRowId={(row) => String(row.id)}
          />
        );
      };
      render(<Wrapper />);

      // Expect the bottom and top arrow icons to be visible
      expect(screen.getAllByRole('img')).toHaveLength(2);

      // go to descending order
      await userEvent.click(
        screen.getByRole('columnheader', { name: 'Supplier name' }),
      );

      // Expect lines to have been sorted by descending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier3');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier1');

      // go to ascending order
      await userEvent.click(
        screen.getByRole('columnheader', { name: 'Supplier name' }),
      );

      // Expect lines to have been sorted by ascending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier1');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier3');

      // reset sort
      await userEvent.click(
        screen.getByRole('columnheader', { name: 'Supplier name' }),
      );

      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier1');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier3');
    });

    it('applies a default sort given `defaultSortState` prop', () => {
      const Wrapper = () => {
        return (
          <Table
            columns={[
              {
                id: 'supplierName',
                header: 'Supplier name',
                renderCell: (cell) => cell.supplierName,
                getSortValue: (item) => item.supplierName,
              },
            ]}
            data={data}
            getRowId={(row) => String(row.id)}
            defaultSortState={{
              columnId: 'supplierName',
              direction: 'descending',
            }}
          />
        );
      };
      render(<Wrapper />);

      // Expect lines to have been sorted by descending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier3');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier1');
    });

    it('applies sort based on Locale', () => {
      const Wrapper = () => {
        return (
          <Table
            columns={[
              {
                id: 'supplierName',
                header: 'Supplier name',
                renderCell: (cell) => cell.supplierName,
                getSortValue: (item) => item.supplierName,
              },
            ]}
            data={[
              { id: 0, supplierName: 'Éberlué', amount: '2$' },
              { id: 1, supplierName: 'eureka', amount: '2$' },
              { id: 2, supplierName: 'dang', amount: '2$' },
            ]}
            defaultSortState={{
              columnId: 'supplierName',
              direction: 'ascending',
            }}
            getRowId={(row) => String(row.id)}
          />
        );
      };
      render(<Wrapper />);

      // Expect lines to have been sorted by ascending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('dang');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Éberlué');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('eureka');
    });

    it('applies sort based on numbers', () => {
      const Wrapper = () => {
        return (
          <Table
            columns={[
              {
                id: 'amount',
                header: 'amount',
                renderCell: (cell) => cell.amount,
                getSortValue: (item) => item.amount,
              },
            ]}
            data={[
              { id: 0, supplierName: 'Supplier1', amount: 2 },
              { id: 1, supplierName: 'Supplier2', amount: 324 },
              { id: 2, supplierName: 'Supplier3', amount: 20 },
              { id: 2, supplierName: 'Supplier4', amount: 20 },
            ]}
            defaultSortState={{
              columnId: 'amount',
              direction: 'ascending',
            }}
            getRowId={(row) => String(row.id)}
          />
        );
      };
      render(<Wrapper />);

      // Expect lines to have been sorted by ascending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('2');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('20');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('20');
      expect(screen.getAllByRole('cell')[3]).toHaveTextContent('324');
    });

    it('supports undefined or null value in the sort', () => {
      const Wrapper = () => {
        return (
          <Table
            columns={[
              {
                id: 'amount',
                header: 'amount',
                renderCell: (cell) => cell.supplierName,
                getSortValue: (item) => item.amount,
              },
            ]}
            data={[
              { id: 0, supplierName: 'Supplier1', amount: 2 },
              { id: 3, supplierName: 'Supplier4', amount: undefined },
              { id: 1, supplierName: 'Supplier2', amount: 324 },
              { id: 2, supplierName: 'Supplier3', amount: 20 },
            ]}
            defaultSortState={{
              columnId: 'amount',
              direction: 'ascending',
            }}
            getRowId={(row) => String(row.id)}
          />
        );
      };
      render(<Wrapper />);

      // Expect lines to have been sorted by ascending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier4');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier1');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier3');
      expect(screen.getAllByRole('cell')[3]).toHaveTextContent('Supplier2');
    });

    it('applies sort given `nextSortDirection` props', async () => {
      const Wrapper = () => {
        return (
          <Table
            columns={[
              {
                id: 'supplierName',
                header: 'Supplier name',
                renderCell: (cell) => cell.supplierName,
                getSortValue: (item) => item.supplierName,
              },
            ]}
            data={[...data, { id: 4, supplierName: 'Supplier0', amount: '2$' }]}
            // on first click, we sort by ascending order, then descending, then ascending ( instead of "none")
            nextSortDirection={{
              none: 'ascending',
              ascending: 'descending',
              descending: 'ascending',
            }}
            getRowId={(row) => String(row.id)}
          />
        );
      };
      render(<Wrapper />);

      // unsorted
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier1');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier3');
      expect(screen.getAllByRole('cell')[3]).toHaveTextContent('Supplier0');

      // go to ascending order
      await userEvent.click(
        screen.getByRole('columnheader', { name: 'Supplier name' }),
      );

      // Expect lines to have been sorted by ascending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier0');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier1');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[3]).toHaveTextContent('Supplier3');

      // go to descending order
      await userEvent.click(
        screen.getByRole('columnheader', { name: 'Supplier name' }),
      );
      // Expect lines to have been sorted by descending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier3');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier1');
      expect(screen.getAllByRole('cell')[3]).toHaveTextContent('Supplier0');

      // go to ascending order
      await userEvent.click(
        screen.getByRole('columnheader', { name: 'Supplier name' }),
      );

      // Expect lines to have been sorted by ascending order
      expect(screen.getAllByRole('cell')[0]).toHaveTextContent('Supplier0');
      expect(screen.getAllByRole('cell')[1]).toHaveTextContent('Supplier1');
      expect(screen.getAllByRole('cell')[2]).toHaveTextContent('Supplier2');
      expect(screen.getAllByRole('cell')[3]).toHaveTextContent('Supplier3');
    });
  });

  describe('given `selectedRowIds`, `getRowId` and `onRowSelectionChange` props', () => {
    it('displays `CheckboxInput` component in the header and in the rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'hey', supplierName: 'Supplier1' },
              { id: 'hey2', supplierName: 'Supplier2' },
              { id: 'hey3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
      };
      render(<Wrapper />);

      // Select first row
      const row1 = screen.getByRole('row', { name: 'Select Supplier1' });
      expect(within(row1).getByRole('checkbox')).not.toBeChecked();

      await userEvent.click(within(row1).getByRole('checkbox'));

      expect(within(row1).getByRole('checkbox')).toBeChecked();

      // Select header
      const header = screen.getAllByRole('columnheader')[0];
      expect(within(header).getByRole('checkbox')).toBePartiallyChecked();

      // Checked second row
      const row2 = screen.getByRole('row', { name: 'Select Supplier2' });
      await userEvent.click(within(row2).getByRole('checkbox'));

      // Checked second row
      const row3 = screen.getByRole('row', { name: 'Select Supplier3' });
      await userEvent.click(within(row3).getByRole('checkbox'));

      expect(within(header).getByRole('checkbox')).toBeChecked();
    });

    it('does not propagate the click from the `CheckboxInput` component', async () => {
      const handleClick = vi.fn();

      render(
        <Table
          data={[
            { id: 'hey', supplierName: 'Supplier1' },
            { id: 'hey2', supplierName: 'Supplier2' },
            { id: 'hey3', supplierName: 'Supplier3' },
          ]}
          columns={[
            {
              id: 'supplierName',

              header: 'supplierName',
              renderCell: (item) => item.supplierName,
            },
          ]}
          selectedRowIds={[]}
          getRowId={(row) => String(row.id)}
          onRowClick={handleClick}
          onRowSelectionChange={vi.fn()}
          onAllRowsSelectionChange={vi.fn()}
        />,
      );

      expect(handleClick).not.toHaveBeenCalled();

      const row1 = screen.getByRole('row', { name: 'Select Supplier1' });
      await userEvent.click(within(row1).getByRole('checkbox'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard navigation', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'hey', supplierName: 'Supplier1' },
              { id: 'hey2', supplierName: 'Supplier2' },
              { id: 'hey3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
      };
      render(<Wrapper />);

      // Select first row
      const row1 = screen.getByRole('row', { name: 'Select Supplier1' });
      expect(within(row1).getByRole('checkbox')).not.toBeChecked();

      await userEvent.click(within(row1).getByRole('checkbox'));

      expect(within(row1).getByRole('checkbox')).toBeChecked();

      await userEvent.keyboard('{ }');

      expect(within(row1).getByRole('checkbox')).not.toBeChecked();
    });
  });

  it('toggles and untoggles rows', async () => {
    const Wrapper = () => {
      const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>([]);
      return (
        <Table
          data={[
            { id: 'Supplier1', supplierName: 'Supplier1' },
            { id: 'Supplier2', supplierName: 'Supplier2' },
            { id: 'Supplier3', supplierName: 'Supplier3' },
          ]}
          columns={[
            {
              id: 'supplierName',

              header: 'supplierName',
              renderCell: (item) => item.supplierName,
            },
          ]}
          selectedRowIds={selectedRowIds}
          getRowId={(row) => String(row.id)}
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
    };
    render(<Wrapper />);

    const row1 = screen.getByRole('row', { name: 'Select Supplier2' });
    const row2 = screen.getByRole('row', { name: 'Select Supplier3' });
    const header = screen.getAllByRole('columnheader')[0];

    await userEvent.click(within(row1).getByRole('checkbox'));
    expect(within(row1).getByRole('checkbox')).toBeChecked();
    expect(within(row2).getByRole('checkbox')).not.toBeChecked();

    await userEvent.click(within(header).getByRole('checkbox'));
    expect(within(row1).getByRole('checkbox')).toBeChecked();
    expect(within(row2).getByRole('checkbox')).toBeChecked();

    await userEvent.click(within(header).getByRole('checkbox'));
    expect(within(row1).getByRole('checkbox')).not.toBeChecked();
    expect(within(row2).getByRole('checkbox')).not.toBeChecked();
  });

  describe('given `selectedRowIds` and `getIsRowDisabled` props', () => {
    it('displays `CheckboxInput` in a disabled state for the affected rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowDisabled={(row) => row.id === 'Supplier1'}
          />
        );
      };
      render(<Wrapper />);

      const disabledRow = screen.getByRole('row', { name: 'Select Supplier1' });
      expect(within(disabledRow).getByRole('checkbox')).not.toBeChecked();
      expect(within(disabledRow).getByRole('checkbox')).toBeDisabled();

      await userEvent.click(within(disabledRow).getByRole('checkbox'));
      expect(within(disabledRow).getByRole('checkbox')).not.toBeChecked();
    });

    it('does not select disabled rows when toggling all rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowDisabled={(row) => row.id === 'Supplier1'}
          />
        );
      };
      render(<Wrapper />);

      const disabledRow = screen.getByRole('row', { name: 'Select Supplier1' });
      const header = screen.getAllByRole('columnheader')[0];

      await userEvent.click(within(header).getByRole('checkbox'));
      expect(within(disabledRow).getByRole('checkbox')).not.toBeChecked();
    });

    it('toggles and untoggles all other rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowDisabled={(row) => row.id === 'Supplier1'}
          />
        );
      };
      render(<Wrapper />);

      const row1 = screen.getByRole('row', { name: 'Select Supplier2' });
      const row2 = screen.getByRole('row', { name: 'Select Supplier3' });
      const header = screen.getAllByRole('columnheader')[0];

      await userEvent.click(within(row1).getByRole('checkbox'));
      expect(within(row1).getByRole('checkbox')).toBeChecked();
      expect(within(row2).getByRole('checkbox')).not.toBeChecked();

      await userEvent.click(within(header).getByRole('checkbox'));
      expect(within(row1).getByRole('checkbox')).toBeChecked();
      expect(within(row2).getByRole('checkbox')).toBeChecked();

      await userEvent.click(within(header).getByRole('checkbox'));
      expect(within(row1).getByRole('checkbox')).not.toBeChecked();
      expect(within(row2).getByRole('checkbox')).not.toBeChecked();
    });

    it('displays a disabled checkbox in the header (select-all) if all rows are disabled', () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowDisabled={() => true}
          />
        );
      };
      render(<Wrapper />);

      const header = screen.getAllByRole('columnheader')[0];
      expect(within(header).getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('given `selectedRowIds` and `getIsRowCheckable` props', () => {
    it('displays `CheckboxInput` in a disabled state for the affected rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowCheckable={(row) => row.id !== 'Supplier1'}
          />
        );
      };
      render(<Wrapper />);

      const disabledRow = screen.getByRole('row', { name: 'Select Supplier1' });
      expect(within(disabledRow).getByRole('checkbox')).not.toBeChecked();
      expect(within(disabledRow).getByRole('checkbox')).toBeDisabled();

      await userEvent.click(within(disabledRow).getByRole('checkbox'));
      expect(within(disabledRow).getByRole('checkbox')).not.toBeChecked();
    });

    it('displays `CheckboxInput` in a disabled and checked state for the affected rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          ['Supplier1'],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowCheckable={(row) => row.id !== 'Supplier1'}
          />
        );
      };
      render(<Wrapper />);

      const disabledRow = screen.getByRole('row', { name: 'Unselect Supplier1' });
      expect(within(disabledRow).getByRole('checkbox')).toBeChecked();
      expect(within(disabledRow).getByRole('checkbox')).toBeDisabled();

      await userEvent.click(within(disabledRow).getByRole('checkbox'));
      expect(within(disabledRow).getByRole('checkbox')).toBeChecked();
    });

    it('does not select disabled rows when toggling all rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowCheckable={(row) => row.id !== 'Supplier1'}
          />
        );
      };
      render(<Wrapper />);

      const disabledRow = screen.getByRole('row', { name: 'Select Supplier1' });
      const header = screen.getAllByRole('columnheader')[0];

      await userEvent.click(within(header).getByRole('checkbox'));
      expect(within(disabledRow).getByRole('checkbox')).not.toBeChecked();
    });

    it('toggles and untoggles all other rows', async () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowCheckable={(row) => row.id !== 'Supplier1'}
          />
        );
      };
      render(<Wrapper />);

      const row1 = screen.getByRole('row', { name: 'Select Supplier2' });
      const row2 = screen.getByRole('row', { name: 'Select Supplier3' });
      const header = screen.getAllByRole('columnheader')[0];

      await userEvent.click(within(row1).getByRole('checkbox'));
      expect(within(row1).getByRole('checkbox')).toBeChecked();
      expect(within(row2).getByRole('checkbox')).not.toBeChecked();

      await userEvent.click(within(header).getByRole('checkbox'));
      expect(within(row1).getByRole('checkbox')).toBeChecked();
      expect(within(row2).getByRole('checkbox')).toBeChecked();

      await userEvent.click(within(header).getByRole('checkbox'));
      expect(within(row1).getByRole('checkbox')).not.toBeChecked();
      expect(within(row2).getByRole('checkbox')).not.toBeChecked();
    });

    it('displays a disabled checkbox in the header (select-all) if all rows are disabled', () => {
      const Wrapper = () => {
        const [selectedRowIds, setSelectedRowsIds] = React.useState<string[]>(
          [],
        );
        return (
          <Table
            data={[
              { id: 'Supplier1', supplierName: 'Supplier1' },
              { id: 'Supplier2', supplierName: 'Supplier2' },
              { id: 'Supplier3', supplierName: 'Supplier3' },
            ]}
            columns={[
              {
                id: 'supplierName',

                header: 'supplierName',
                renderCell: (item) => item.supplierName,
              },
            ]}
            selectedRowIds={selectedRowIds}
            getRowId={(row) => String(row.id)}
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
            getIsRowCheckable={() => false}
          />
        );
      };
      render(<Wrapper />);

      const header = screen.getAllByRole('columnheader')[0];
      expect(within(header).getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('given `groupBy`', () => {
    it('groups rows together', () => {
      render(
        <Table
          data={[
            { id: 'Supplier1', supplierName: 'Supplier1', payableId: 'A' },
            { id: 'Supplier2', supplierName: 'Supplier2', payableId: 'A' },
            { id: 'Supplier3', supplierName: 'Supplier3', payableId: 'B' },
            { id: 'Supplier4', supplierName: 'Supplier4', payableId: 'A' },
          ]}
          columns={[
            {
              id: 'supplierName',

              header: 'supplierName',
              renderCell: (item) => item.supplierName,
            },
          ]}
          groupBy={(row) => row.payableId}
        />,
      );

      expect(screen.getByRole('row', { name: 'A' })).toBeVisible();
      expect(screen.getByRole('row', { name: 'B' })).toBeVisible();
    });

    it('supports custom header with renderGroupedRowHeader', () => {
      render(
        <Table
          data={[
            { id: 'Supplier1', supplierName: 'Supplier1', payableId: 'A' },
            { id: 'Supplier2', supplierName: 'Supplier2', payableId: 'A' },
            { id: 'Supplier3', supplierName: 'Supplier3', payableId: 'B' },
            { id: 'Supplier4', supplierName: 'Supplier4', payableId: 'A' },
          ]}
          columns={[
            {
              id: 'supplierName',

              header: 'supplierName',
              renderCell: (item) => item.supplierName,
            },
          ]}
          groupBy={(row) => row.payableId}
          renderGroupedRowHeader={(value, rows) =>
            `${value} - ${rows.length} items`
          }
        />,
      );

      expect(screen.getByRole('row', { name: 'A - 3 items' })).toBeVisible();
      expect(screen.getByRole('row', { name: 'B - 1 items' })).toBeVisible();
    });
  });
});
