import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OptionGroup, OptionGroupProps } from './';

describe('OptionGroup component', () => {
  it('allows user to choose between option', async () => {
    const options = [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'yearly', label: 'Yearly' },
    ];
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>(options[0].value);

      return (
        <OptionGroup
          name="OptionGroup"
          value={value}
          options={options}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      );
    };
    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
    expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
  });

  it('allows user to choose between option with icons', async () => {
    const options: OptionGroupProps['options'] = [
      { value: 'daily', label: 'Daily', iconName: 'bike' },
      { value: 'weekly', label: 'Weekly', iconName: 'car' },
      { value: 'yearly', label: 'Yearly', iconName: 'plane' },
    ];
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>(options[0].value);

      return (
        <OptionGroup
          name="OptionGroup"
          value={value}
          options={options}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      );
    };
    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
    expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
  });

  it('supports boolean value', async () => {
    const options = [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ];
    const Wrapper = () => {
      const [value, setValue] = React.useState<boolean>(options[0].value);

      return (
        <OptionGroup
          name="OptionGroup"
          value={value}
          options={options}
          onChange={(e) => setValue(e.currentTarget.value === 'true')}
        />
      );
    };
    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Yes' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'No' })).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'No' }));

    expect(screen.getByRole('radio', { name: 'Yes' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'No' })).toBeChecked();
  });

  it('allows creating multiple optionGroup in the same page', async () => {
    const periodOptions = [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
    ];
    const paymentOptions = [
      { value: 'wire-transfert', label: 'Wire transfert' },
      { value: 'direct-debit', label: 'Direct debit' },
    ];
    const Wrapper = () => {
      const [period, setPeriod] = React.useState<string>(
        periodOptions[0].value,
      );
      const [payment, setPayment] = React.useState<string>(
        paymentOptions[0].value,
      );

      return (
        <>
          <OptionGroup
            name="period"
            value={period}
            options={periodOptions}
            onChange={(e) => setPeriod(e.currentTarget.value)}
          />
          <OptionGroup
            name="payment"
            value={payment}
            options={paymentOptions}
            onChange={(e) => setPayment(e.currentTarget.value)}
          />
        </>
      );
    };
    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Wire transfert' })).toBeChecked();
    expect(
      screen.getByRole('radio', { name: 'Direct debit' }),
    ).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));

    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Wire transfert' })).toBeChecked();
    expect(
      screen.getByRole('radio', { name: 'Direct debit' }),
    ).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Direct debit' }));

    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    expect(
      screen.getByRole('radio', { name: 'Wire transfert' }),
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Direct debit' })).toBeChecked();
  });

  it('supports keyboard navigation', async () => {
    const options = [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'yearly', label: 'Yearly' },
    ];
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>('');
      return (
        <OptionGroup
          name="OptionGroup"
          value={value}
          options={options}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      );
    };
    render(<Wrapper />);
    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();

    await userEvent.tab(); // Focus first item
    await userEvent.keyboard('{ }'); // Select first item
    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();
  });

  it('disallows user to choose between option when isDisable is true', async () => {
    const options = [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'yearly', label: 'Yearly' },
    ];
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>(options[0].value);

      return (
        <OptionGroup
          name="OptionGroup"
          value={value}
          options={options}
          isDisabled
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      );
    };
    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
    // No change on click when disabled
    expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();
  });

  it('show an invalid state when isInvalid is true', async () => {
    const options = [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'yearly', label: 'Yearly' },
    ];
    const Wrapper = () => {
      const [value, setValue] = React.useState<string | null>(null);

      return (
        <OptionGroup
          aria-label="test"
          name="OptionGroup"
          value={value}
          options={options}
          isInvalid={value === null}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      );
    };
    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();
    expect(screen.getByRole('radiogroup', { name: 'test' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );

    await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
    // No change on click when disabled
    expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'false',
    );
  });

  it('Supports adding the `className` prop to add additionnal CSS classes', () => {
    const options = [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'yearly', label: 'Yearly' },
    ];
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>(options[0].value);

      return (
        <OptionGroup
          className="MyOptionGroup"
          name="OptionGroup"
          value={value}
          options={options}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      );
    };
    render(<Wrapper />);
    expect(screen.getByRole('radiogroup')).toHaveClass('MyOptionGroup');
  });
});
