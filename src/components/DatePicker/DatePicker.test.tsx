import React, { useState } from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormField } from '../FormField';
import { renderWithGrapesProvider } from '../../test-utils/renderers';

import { DatePicker } from './';

describe('DatePicker component', () => {
  it('should allow user to pick a date', async () => {
    const Wrapper = () => {
      const [date, setDate] = useState<Date | undefined>(new Date(2022, 1, 1));
      return (
        <>
          <p>Escape focus</p>
          <FormField label="Choose date">
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </FormField>
        </>
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    expect(screen.getByRole('textbox', { name: /choose date/i })).toHaveValue(
      '02/01/2022',
    );

    await userEvent.click(
      screen.getByRole('textbox', { name: /choose date/i }),
    );
    expect(screen.getByRole('dialog', { name: /choose date/i })).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Next month' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'Sunday, March 27, 2022' }),
    );

    await waitForElementToBeRemoved(
      screen.queryByRole('dialog', { name: /choose date/i }),
    );

    expect(screen.getByRole('textbox', { name: /choose date/i })).toHaveValue(
      '03/27/2022',
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Open calendar' }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'Previous month' }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'Saturday, February 12, 2022' }),
    );

    await waitForElementToBeRemoved(
      screen.queryByRole('dialog', { name: /choose date/i }),
    );

    expect(screen.getByRole('textbox', { name: /choose date/i })).toHaveValue(
      '02/12/2022',
    );
  });

  it('should toggle calendar picker when user clicks on the toggle button', async () => {
    const Wrapper = () => {
      const [date, setDate] = useState<Date | undefined>();
      return (
        <>
          <p>Escape focus</p>
          <FormField label="Choose date">
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </FormField>
        </>
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    await userEvent.click(screen.getByRole('button', { name: /Open/i }));
    expect(screen.getByRole('dialog', { name: /choose date/i })).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: /Close/i }));
    await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  });

  it('should close the calendar when user hits Escape key', async () => {
    const Wrapper = () => {
      const [date, setDate] = useState<Date | undefined>();
      return (
        <>
          <p>Escape focus</p>
          <FormField label="Choose date">
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </FormField>
        </>
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    await userEvent.type(screen.getByText('Escape focus'), '{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Open/i }));
    expect(screen.getByRole('dialog', { name: /choose date/i })).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  });

  it('should close the calendar when user moves the focus', async () => {
    const Wrapper = () => {
      const [date, setDate] = useState<Date | undefined>();
      return (
        <>
          <button type="button">Escape focus</button>
          <FormField label="Choose date">
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </FormField>
        </>
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    await userEvent.tab(); // focus first button
    await userEvent.tab(); // focus DatePicker

    expect(screen.getByRole('dialog', { name: /choose date/i })).toBeVisible();

    await userEvent.tab({ shift: true }); // focus back the first button
    await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  });

  it('should allow user to enter a date', async () => {
    const Wrapper = () => {
      const [date, setDate] = useState<Date | undefined>();
      return (
        <>
          <p>Escape focus</p>
          <FormField label="Choose date">
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </FormField>
        </>
      );
    };
    renderWithGrapesProvider(<Wrapper />);

    await userEvent.type(
      screen.getByRole('textbox', { name: /choose date/i }),
      '11022022',
    );

    expect(screen.getByRole('textbox', { name: /choose date/i })).toHaveValue(
      '11/02/2022',
    );
  });

  it('should handle the case where month start on a Sunday', async () => {
    const Wrapper = () => {
      const [date, setDate] = useState<Date | undefined>(new Date(2023, 0, 1));
      return (
        <>
          <p>Escape focus</p>
          <FormField label="Choose date">
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </FormField>
        </>
      );
    };
    renderWithGrapesProvider(<Wrapper />, { locale: 'en-US' });

    await userEvent.click(
      screen.getByRole('textbox', { name: /choose date/i }),
    );

    expect(
      screen.getByRole('button', { name: /Sunday, January 1, 2023/ }),
    ).toHaveStyle({ 'grid-column-start': 1 });
  });

  it('should not return a date when no date is set', async () => {
    const handleChange = vi.fn();

    renderWithGrapesProvider(
      <FormField label="Choose date">
        <DatePicker value={new Date(2022, 1, 1)} onChange={handleChange} />
      </FormField>,
    );

    await userEvent.clear(
      screen.getByRole('textbox', { name: /choose date/i }),
    );

    // Expect handleChange to have been called with nothing - no date
    expect(handleChange).toHaveBeenCalledExactlyOnceWith();
  });
});
