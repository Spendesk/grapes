import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup } from './';
import { RadioField } from '../RadioField';
import { FormField } from '../FormField';

describe('RadioGroup component', () => {
  describe('given default props', () => {
    describe('given no selected value', () => {
      it('has an array of `RadioField` components as children with inherited props and none is checked', async () => {
        const className = 'MyRadioGroup';
        let currentValue;

        const Container = () => {
          const [value, setValue] = useState('');
          currentValue = value;
          return (
            <FormField label="Frequency">
              <RadioGroup
                name="my-group"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={className}
              >
                <RadioField value="daily" label="Daily" />
                <RadioField value="weekly" label="Weekly" />
                <RadioField value="yearly" label="Yearly" />
              </RadioGroup>
            </FormField>
          );
        };
        render(<Container />);

        expect(
          screen.getByRole('radiogroup', { name: 'Frequency' }),
        ).toHaveClass(className);
        expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
        expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
        expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();

        await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));

        expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
        expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
        expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();

        await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));

        expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();

        expect(currentValue).toBe('weekly');
      });
    });

    describe('given a selected value', () => {
      it('has an array of `RadioField` components as children with inherited props and the second one is checked', async () => {
        const selectedValue = 'yearly';
        const Container = () => {
          const [value, setValue] = useState(selectedValue);
          return (
            <FormField label="Frequency">
              <RadioGroup
                name="my-group"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <RadioField value="daily" label="Daily" />
                <RadioField value="weekly" label="Weekly" isDisabled />
                <RadioField value="yearly" label="Yearly" />
              </RadioGroup>
            </FormField>
          );
        };
        render(<Container />);

        expect(screen.getByRole('radio', { name: 'Daily' })).not.toBeChecked();
        expect(screen.getByRole('radio', { name: 'Weekly' })).not.toBeChecked();
        expect(screen.getByRole('radio', { name: 'Yearly' })).toBeChecked();

        await userEvent.click(screen.getByRole('radio', { name: 'Daily' }));

        expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();

        await userEvent.click(screen.getByRole('radio', { name: 'Weekly' }));

        expect(screen.getByRole('radio', { name: 'Daily' })).toBeChecked();
      });
    });
  });

  it('given a `direction` props displays the RadioInput in column', () => {
    render(
      <FormField label="Frequency">
        <RadioGroup
          name="my-group"
          value={null}
          onChange={vi.fn()}
          direction="column"
        >
          <RadioField value="daily" label="Daily" />
          <RadioField value="weekly" label="Weekly" />
        </RadioGroup>
      </FormField>,
    );

    expect(
      screen.getByRole('radiogroup', { name: 'Frequency' }),
    ).toHaveAttribute('aria-orientation', 'vertical');
  });
});
