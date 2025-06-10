import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';

import { PhoneInput } from './';
import { COUNTRIES } from './stories/country';

const SUBSET_COUNTRIES = ['US', 'FR', 'UK'].map((key) => ({
  key,
  label: COUNTRIES[key],
}));

describe('PhoneInput component', () => {
  it('allows user to enter a phone number value', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<string | null>(null);
      const handleChange = (newValue: string) => {
        setValue(newValue);
      };

      return (
        <PhoneInput
          onChange={handleChange}
          value={value}
          callingCode="33"
          country="FR"
          countries={SUBSET_COUNTRIES}
          onSelectCountry={vi.fn()}
          formatPhoneNumber={(value) =>
            value ? value.replace(`+33 `, '') : ''
          }
        />
      );
    };
    render(<Wrapper />);

    expect(screen.getByAltText(`FR-flag`)).toBeVisible();

    await userEvent.type(screen.getByRole('textbox'), '622222222');
    expect(screen.getByRole('textbox')).toHaveValue('622222222');
  });

  it('allows user to select a country', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<string | null>(null);
      const [country, setCountry] = React.useState<string>('FR');
      const handleChange = (newValue: string) => {
        setValue(newValue);
      };
      return (
        <PhoneInput
          onChange={handleChange}
          value={value}
          callingCode={getCountryCallingCode(country as CountryCode)}
          country={country}
          countries={SUBSET_COUNTRIES}
          onSelectCountry={(selectedCountry) => {
            setCountry(selectedCountry.key);
          }}
          formatPhoneNumber={vi.fn()}
        />
      );
    };
    render(<Wrapper />);

    // Open menu
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(
      await screen.findByRole('option', { name: COUNTRIES['US'] }),
    );

    await waitForElementToBeRemoved(screen.getByText(COUNTRIES['US']));
    expect(screen.getByAltText(`US-flag`)).toBeVisible();
    expect(screen.getByText(`(+${getCountryCallingCode('US')})`)).toBeVisible();

    expect(screen.queryByAltText(`FR-flag`)).not.toBeInTheDocument();
  });

  it('supports onBlur and onFocus callback', async () => {
    const handleBlur = vi.fn();
    const handleFocus = vi.fn();

    render(
      <div>
        <p>Escape focus</p>
        <PhoneInput
          onChange={vi.fn()}
          value={'612345678'}
          callingCode="33"
          onBlur={handleBlur}
          onFocus={handleFocus}
          country="FR"
          countries={SUBSET_COUNTRIES}
          onSelectCountry={vi.fn()}
          formatPhoneNumber={(value) =>
            value ? value.replace(`+33 `, '') : ''
          }
        />
      </div>,
    );

    expect(handleFocus).not.toHaveBeenCalled();

    await userEvent.type(screen.getByRole('textbox'), '22');
    expect(handleFocus).toHaveBeenCalled();

    expect(handleBlur).not.toHaveBeenCalled();

    await userEvent.click(screen.getByText('Escape focus'));
    expect(handleBlur).toHaveBeenCalled();
  });
});
