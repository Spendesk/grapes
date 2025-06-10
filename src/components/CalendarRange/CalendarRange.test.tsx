import React, { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithGrapesProvider } from '../../test-utils/renderers';

import { CalendarRange, type DateRange } from './';

describe('CalendarRange component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow user to pick a range', async () => {
    const date = new Date(2022, 1, 1);
    vi.setSystemTime(date);

    const handleClick = vi.fn();
    const Wrapper = () => {
      const [range, setRange] = useState<DateRange>([undefined, undefined]);
      return (
        <CalendarRange
          value={range}
          onClick={(range) => {
            setRange(range);
            handleClick(range);
          }}
        />
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    expect(screen.getByText('January 2022')).toBeVisible();
    expect(screen.getByText('February 2022')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: /next month/i }));

    expect(screen.queryByText('January 2022')).not.toBeInTheDocument();
    expect(screen.getByText('March 2022')).toBeVisible();
    expect(screen.getByText('February 2022')).toBeVisible();

    await userEvent.click(
      screen.getByRole('button', { name: 'Wednesday, February 23, 2022' }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'Wednesday, March 30, 2022' }),
    );

    expect(handleClick).toHaveBeenLastCalledWith([
      new Date(2022, 1, 23),
      new Date(2022, 2, 30, 23, 59, 59, 999),
    ]);
  });

  it('should support maxDate and minDate', () => {
    const handleClick = vi.fn();
    renderWithGrapesProvider(
      <CalendarRange
        value={[undefined, undefined]}
        onClick={handleClick}
        minDate={new Date(2022, 1, 2)}
        maxDate={new Date(2022, 1, 15)}
      />,
    );

    expect(screen.getByText('January 2022')).toBeVisible();
    expect(screen.getByText('February 2022')).toBeVisible();

    expect(
      screen.getByRole('button', { name: 'Wednesday, January 12, 2022' }),
    ).toBeDisabled();
  });

  it('should reset the range when the user clicks on a selected date', async () => {
    const handleClick = vi.fn();
    const Wrapper = () => {
      const [range, setRange] = useState<DateRange>([
        new Date(2022, 1, 1),
        undefined,
      ]);
      return (
        <CalendarRange
          value={range}
          onClick={(range) => {
            setRange(range);
            handleClick(range);
          }}
        />
      );
    };
    renderWithGrapesProvider(<Wrapper />);
    await userEvent.click(
      screen.getByRole('button', { name: 'Tuesday, February 1, 2022' }),
    );

    expect(handleClick).toHaveBeenLastCalledWith([undefined, undefined]);
  });

  it('should create a reverse range when user clicks on a second date earlier than the first one', async () => {
    const handleClick = vi.fn();
    const Wrapper = () => {
      const [range, setRange] = useState<DateRange>([
        new Date(2022, 2, 15),
        undefined,
      ]);
      return (
        <CalendarRange
          value={range}
          onClick={(range) => {
            setRange(range);
            handleClick(range);
          }}
        />
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    await userEvent.click(
      screen.getByRole('button', { name: /previous month/i }),
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Wednesday, February 23, 2022' }),
    );

    expect(handleClick).toHaveBeenLastCalledWith([
      new Date(2022, 1, 23),
      new Date(2022, 2, 15, 23, 59, 59, 999),
    ]);
  });

  it('should select the whole month when clicking on the month', async () => {
    const handleClick = vi.fn();
    const Wrapper = () => {
      const [range, setRange] = useState<DateRange>([
        new Date(2022, 2, 15),
        undefined,
      ]);
      return (
        <CalendarRange
          value={range}
          onClick={(range) => {
            setRange(range);
            handleClick(range);
          }}
        />
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    await userEvent.click(
      screen.getByRole('button', { name: 'February 2022' }),
    );

    expect(handleClick).toHaveBeenLastCalledWith([
      new Date(2022, 1, 1),
      new Date(2022, 1, 28, 23, 59, 59, 999),
    ]);

    await userEvent.click(screen.getByRole('button', { name: 'March 2022' }));

    expect(handleClick).toHaveBeenLastCalledWith([
      new Date(2022, 2, 1),
      new Date(2022, 2, 31, 23, 59, 59, 999),
    ]);
  });

  it('should only select the non disabled days when clicking on the month', async () => {
    const handleClick = vi.fn();
    const Wrapper = () => {
      const [range, setRange] = useState<DateRange>([
        new Date(2022, 2, 15),
        undefined,
      ]);
      return (
        <CalendarRange
          value={range}
          minDate={new Date(2022, 1, 2)}
          maxDate={new Date(2022, 1, 15, 23, 59, 59, 999)}
          onClick={(range) => {
            setRange(range);
            handleClick(range);
          }}
        />
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    await userEvent.click(
      screen.getByRole('button', { name: 'February 2022' }),
    );

    expect(handleClick).toHaveBeenLastCalledWith([
      new Date(2022, 1, 2),
      new Date(2022, 1, 15, 23, 59, 59, 999),
    ]);

    expect(screen.getByRole('button', { name: 'March 2022' })).toBeDisabled();
  });

  it('should display only one month when hasOneCalendar is set', async () => {
    const handleClick = vi.fn();
    const Wrapper = () => {
      const [range, setRange] = useState<DateRange>([
        new Date(2022, 1, 1),
        new Date(2022, 1, 15),
      ]);
      return (
        <CalendarRange
          value={range}
          numberOfCalendars={1}
          onClick={(range) => {
            setRange(range);
            handleClick(range);
          }}
        />
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    expect(screen.getByText('February 2022')).toBeVisible();

    // Except only February to be visible so January and March should not be visible
    expect(screen.queryByText('January 2022')).not.toBeInTheDocument();
    expect(screen.queryByText('March 2022')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Next month' }));

    expect(screen.getByText('March 2022')).toBeVisible();
    expect(screen.queryByText('February 2022')).not.toBeInTheDocument();
  });
});
