import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AmountInput } from './';
import { GrapesProvider } from '../GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import { FormField } from '../FormField';

describe('AmountInput component', () => {
  const currencies = [
    { key: 'EUR', label: '€ - Euro' },
    {
      key: 'GBP',
      label: '£ - British Pound',
    },
    {
      key: 'USD',
      label: '$ - US Dollar',
    },
    { key: 'JPY', label: '¥ - Yen' },
  ];
  it('allows user to only enter positive value', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState(0);
      return (
        <>
          <label htmlFor="money">Money</label>
          <AmountInput
            id="money"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.valueAsNumber)
            }
            currency={currencies[0]}
          />
        </>
      );
    };
    render(<Wrapper />);

    expect(screen.getByText('€')).toBeVisible();

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '10',
    );
    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveValue(10);

    await userEvent.clear(screen.getByRole('spinbutton', { name: 'Money' }));

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '-2',
    );
    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveValue(2);
  });

  it('allows user to enter negative value with the `hasNegativeValueAllowed` prop', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState(0);
      return (
        <>
          <label htmlFor="money">Money</label>
          <AmountInput
            id="money"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.valueAsNumber)
            }
            currency={currencies[0]}
            hasNegativeValueAllowed
          />
        </>
      );
    };
    render(<Wrapper />);

    await userEvent.clear(screen.getByRole('spinbutton', { name: 'Money' }));

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '-2',
    );
    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveValue(-2);
  });

  it('rounds the value to 2 decimals for EUR', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState(0);
      return (
        <>
          <label htmlFor="money">Money</label>
          <AmountInput
            id="money"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.valueAsNumber)
            }
            currency={currencies[0]}
            hasNegativeValueAllowed
          />
        </>
      );
    };
    render(<Wrapper />);

    await userEvent.clear(screen.getByRole('spinbutton', { name: 'Money' }));
    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '5.559',
    );
    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveValue(5.56);

    await userEvent.clear(screen.getByRole('spinbutton', { name: 'Money' }));
    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '-5.559',
    );
    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveValue(
      -5.56,
    );
  });

  it('rounds the value to 0 decimals for JPY', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState(0);
      return (
        <>
          <label htmlFor="money">Money</label>
          <AmountInput
            id="money"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.valueAsNumber)
            }
            currency={currencies[3]}
            hasNegativeValueAllowed
          />
        </>
      );
    };
    render(<Wrapper />);

    await userEvent.clear(screen.getByRole('spinbutton', { name: 'Money' }));
    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '5.6',
    );
    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveValue(6);

    await userEvent.clear(screen.getByRole('spinbutton', { name: 'Money' }));
    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '-5.9',
    );
    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveValue(-6);
  });

  it('allows user to select a currency', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState(0);
      const [currency, setCurrency] = React.useState(currencies[0]);
      return (
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <label htmlFor="money">Money</label>
          <AmountInput
            id="money"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.valueAsNumber)
            }
            currencies={currencies}
            onSelectCurrency={setCurrency}
            currency={currency}
          />
        </GrapesProvider>
      );
    };
    render(<Wrapper />);
    expect(screen.getByText(currencies[0].key)).toBeVisible();
    // Open menu
    await userEvent.click(
      screen.getByRole('combobox', { name: 'Select currency' }),
    );
    await userEvent.click(
      await screen.findByRole('option', { name: currencies[2].label }),
    );
    await waitForElementToBeRemoved(screen.getByText(currencies[2].label));
    expect(screen.getByText(currencies[2].key)).toBeVisible();
    expect(screen.queryByText(currencies[0].key)).not.toBeInTheDocument();
  });

  it('should remove focus when user scroll into the component', async () => {
    render(
      <FormField label="Money">
        <AmountInput
          value={1}
          onChange={vi.fn()}
          currency={currencies[0]}
          hasNegativeValueAllowed
        />
      </FormField>,
    );

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Money' }),
      '55',
    );

    expect(screen.getByRole('spinbutton', { name: 'Money' })).toHaveFocus();
    fireEvent.wheel(screen.getByRole('spinbutton', { name: 'Money' }));
    expect(screen.getByRole('spinbutton', { name: 'Money' })).not.toHaveFocus();
  });
});
