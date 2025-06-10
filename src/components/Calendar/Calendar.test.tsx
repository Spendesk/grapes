import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithGrapesProvider } from '../../test-utils/renderers';

import { Calendar } from './';

describe('Calendar component', () => {
  it('should allow user to pick a date', async () => {
    const defaultDate = new Date(2022, 1, 1);
    const handleClick = vi.fn();
    renderWithGrapesProvider(
      <Calendar value={defaultDate} onClick={handleClick} />,
    );

    expect(screen.getByText('February 2022')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: /next month/i }));

    expect(screen.getByText('March 2022')).toBeVisible();

    expect(handleClick).not.toHaveBeenCalled();

    await userEvent.click(
      screen.getByRole('button', { name: 'Wednesday, March 30, 2022' }),
    );

    expect(handleClick).toHaveBeenCalledWith(new Date(2022, 2, 30));
  });

  it('supports min and max date', () => {
    const defaultDate = new Date(2022, 1, 15);
    const minDate = new Date(2022, 1, 5);
    const maxDate = new Date(2022, 1, 25);
    const handleClick = vi.fn();

    renderWithGrapesProvider(
      <Calendar
        value={defaultDate}
        onClick={handleClick}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );

    expect(screen.getByText('February 2022')).toBeVisible();

    expect(
      screen.getByRole('button', { name: 'Friday, February 25, 2022' }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Saturday, February 26, 2022' }),
    ).toBeDisabled();

    expect(
      screen.getByRole('button', { name: 'Friday, February 4, 2022' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Saturday, February 5, 2022' }),
    ).not.toBeDisabled();
  });
});
