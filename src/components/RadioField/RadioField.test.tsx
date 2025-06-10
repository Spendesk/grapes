import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioField } from './';

describe('RadioField component', () => {
  it('allows user to choose between option', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>('');
      return (
        <div>
          <RadioField
            name="test"
            value="physical_cards"
            isChecked={value === 'physical_cards'}
            label="Physical Cards"
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <RadioField
            name="test"
            value="virtual_cards"
            isChecked={value === 'virtual_cards'}
            label="Virtual Cards"
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </div>
      );
    };

    render(<Wrapper />);

    expect(
      screen.getByRole('radio', { name: 'Physical Cards' }),
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', { name: 'Virtual Cards' }),
    ).not.toBeChecked();

    await userEvent.click(
      screen.getByRole('radio', { name: 'Physical Cards' }),
    );
    expect(screen.getByRole('radio', { name: 'Physical Cards' })).toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Virtual Cards' }));
    expect(screen.getByRole('radio', { name: 'Virtual Cards' })).toBeChecked();
    expect(
      screen.getByRole('radio', { name: 'Physical Cards' }),
    ).not.toBeChecked();
  });
});
