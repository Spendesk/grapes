import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SwitchInput } from './';

describe('SwitchInput component', () => {
  it('allows user to check and uncheck', async () => {
    const ControlledSwitch = () => {
      const [isChecked, setChecked] = React.useState(false);
      return (
        <SwitchInput
          isChecked={isChecked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      );
    };

    render(<ControlledSwitch />);

    expect(screen.getByRole('switch')).toBeVisible();
    expect(screen.getByRole('switch')).not.toBeChecked();

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toBeChecked();

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('disables the switch when props isDisabled is true', () => {
    render(<SwitchInput isChecked isDisabled onChange={vi.fn()} />);

    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
