import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup } from '../RadioGroup';
import { RadioBox } from './';

describe('RadioBox component', () => {
  it('allows user to choose between option', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>('');
      return (
        <RadioGroup
          name="cards"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          <RadioBox value="daily" label="Daily" />
          <RadioBox value="weekly" label="Weekly" />
        </RadioGroup>
      );
    };

    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Daily' }));
    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
    expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
  });

  it('describes each options', () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>('');
      return (
        <RadioGroup
          name="cards"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          <RadioBox
            value="daily"
            iconName="archive"
            label="Daily"
            description="Once a day"
          />
          <RadioBox
            value="weekly"
            iconName="archive"
            label="Weekly"
            description="Once a week"
          />
        </RadioGroup>
      );
    };

    render(<Wrapper />);

    expect(
      screen.getByRole('radio', { name: 'Daily' }),
    ).toHaveAccessibleDescription('Once a day');
    expect(
      screen.getByRole('radio', { name: 'Weekly' }),
    ).toHaveAccessibleDescription('Once a week');
  });

  it('supports keyboard navigation', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<string>('');
      return (
        <RadioGroup
          name="cards"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          <RadioBox value="daily" label="Daily" description="Once a day" />
          <RadioBox value="weekly" label="Weekly" description="Once a week" />
          <RadioBox value="yearly" label="Yearly" description="Once a year" />
        </RadioGroup>
      );
    };

    render(<Wrapper />);

    expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();

    await userEvent.tab();
    expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();

    await userEvent.keyboard('{ }');
    expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();

    await userEvent.keyboard('{arrowright}');
    expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveFocus();

    await userEvent.keyboard('{arrowright}');
    expect(screen.getByRole('radio', { name: 'Yearly' })).toHaveFocus();

    await userEvent.keyboard('{arrowright}');
    expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();

    await userEvent.keyboard('{arrowleft}');
    expect(screen.getByRole('radio', { name: 'Yearly' })).toHaveFocus();
  });
});
