import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SwitchField } from './';

describe('SwitchField component', () => {
  it('allows user to check and uncheck', async () => {
    const ControlledSwitch = () => {
      const [isChecked, setChecked] = React.useState(false);
      return (
        <SwitchField
          label="my switch"
          isChecked={isChecked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      );
    };

    render(<ControlledSwitch />);

    expect(screen.getByRole('switch', { name: 'my switch' })).toBeVisible();
    expect(screen.getByRole('switch')).not.toBeChecked();

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toBeChecked();

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('disables the switch when props isDisabled is true', () => {
    render(
      <SwitchField label="my switch" isChecked isDisabled onChange={vi.fn()} />,
    );

    expect(screen.getByRole('switch', { name: 'my switch' })).toBeDisabled();
  });

  it('displays an helptText when provided', () => {
    render(
      <SwitchField
        label="my switch"
        isChecked
        helpText="I'm here to help!"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText("I'm here to help!")).toBeVisible();
  });
});
