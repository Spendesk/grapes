import React from 'react';
import { render, screen } from '@testing-library/react';

import { Input } from '../Input';
import { Select } from '../Select';
import { TextArea } from '../TextArea';

import { FormField } from './';
import { OptionGroup } from '../OptionGroup';
import { GrapesProvider } from '../GrapesProvider/GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';

describe('FormField component', () => {
  const value = 'abc';
  const onChange = vi.fn();

  describe('given default props', () => {
    it('has a label and an input as child', () => {
      render(
        <FormField label="A label" description="An optional description">
          <Input value={value} onChange={onChange} />
        </FormField>,
      );

      expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
      expect(
        screen.getByRole('textbox', { name: 'A label' }),
      ).toHaveAccessibleDescription('An optional description');
    });
    it('has a label and a select as child', () => {
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <FormField label="A label" description="An optional description">
            <Select
              value={undefined}
              options={[
                { key: '1', label: 'option 1' },
                { key: '2', label: 'option 2' },
              ]}
              onSelect={vi.fn()}
            />
          </FormField>
        </GrapesProvider>,
      );

      expect(screen.getByRole('combobox', { name: 'A label' })).toBeVisible();
      expect(
        screen.getByRole('combobox', { name: 'A label' }),
      ).toHaveAccessibleDescription('An optional description');
    });

    it('has a label and a textarea as child', () => {
      render(
        <FormField label="A label">
          <TextArea value={'abc'} onChange={vi.fn()} />
        </FormField>,
      );

      expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
    });

    it('has a label, a description and a textarea as child', () => {
      render(
        <FormField label="A label" description="An optional description">
          <TextArea value={'abc'} onChange={vi.fn()} />
        </FormField>,
      );

      expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
      expect(
        screen.getByRole('textbox', { name: 'A label' }),
      ).toHaveAccessibleDescription('An optional description');
    });

    it('has a label and an optiongroup as child', () => {
      const options = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'yearly', label: 'Yearly' },
      ];
      const Wrapper = () => {
        const [value, setValue] = React.useState<string>('');
        return (
          <FormField label="A label" description="An optional description">
            <OptionGroup
              name="OptionGroup"
              value={value}
              options={options}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
          </FormField>
        );
      };
      render(<Wrapper />);

      expect(screen.getByRole('radiogroup', { name: 'A label' })).toBeVisible();
      expect(
        screen.getByRole('radiogroup', { name: 'A label' }),
      ).toHaveAccessibleDescription('An optional description');
    });
  });

  describe('given a `message` props', () => {
    it('displays an alert message in priority', () => {
      render(
        <FormField
          label="Heating"
          alertMessage="EVERYTHING IS ON FIRE!"
          warningMessage="It's hot"
        >
          <Input value={value} onChange={onChange} />
        </FormField>,
      );

      const input = screen.getByRole('textbox', { name: 'Heating' });
      expect(input).toBeVisible();
      expect(input).toHaveAccessibleErrorMessage('EVERYTHING IS ON FIRE!');
    });

    it('invalides the inner input when alertMessage is given', () => {
      render(
        <FormField label="email" alertMessage="Email is not valid">
          <Input value={value} onChange={onChange} />
        </FormField>,
      );

      const input = screen.getByRole('textbox', { name: 'email' });
      expect(input).toBeInvalid();
      expect(input).toHaveAccessibleErrorMessage('Email is not valid');
    });

    it("shows warning when there's no alert", () => {
      render(
        <FormField label="Heating" warningMessage="It's hot">
          <Input value={value} onChange={onChange} />
        </FormField>,
      );

      const input = screen.getByRole('textbox', { name: 'Heating' });
      expect(input).toBeVisible();
      expect(input).not.toBeInvalid();
      expect(screen.getByRole('status', { name: `It's hot` })).toBeVisible();
    });

    it('allows input to override the error state', () => {
      render(
        <FormField label="email" alertMessage="Email is not valid">
          <Input value={value} onChange={onChange} isInvalid={false} />
        </FormField>,
      );

      const input = screen.getByRole('textbox', { name: 'email' });
      expect(input).toBeVisible();
      expect(input).not.toBeInvalid();
      expect(screen.getByText('Email is not valid')).toBeVisible();
    });
  });
});
