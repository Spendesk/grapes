import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Option } from './option';
import { Select } from './';
import { FormField } from '../FormField';
import { GrapesProvider } from '../GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';

const options: Option[] = [
  { key: '1', label: 'option 1' },
  { key: '2', label: 'option 2' },
];

describe('Select', () => {
  describe('given some option groups', () => {
    const options = [
      { key: '1', label: 'option 1' },
      {
        key: 'group',
        label: 'Group',
        options: [{ key: '2', label: 'option 2' }],
      },
      { key: '3', label: 'option 3' },
    ];

    it('allows user to select an option in a group', async () => {
      const handleSelect = vi.fn();
      const Wrapper = () => {
        return (
          <FormField label="Choose">
            <Select
              value={undefined}
              options={options}
              onSelect={handleSelect}
            />
          </FormField>
        );
      };

      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <Wrapper />
        </GrapesProvider>,
      );

      expect(screen.queryByRole('option')).not.toBeInTheDocument();

      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeVisible();
      expect(
        await screen.findByRole('option', { name: 'option 1' }),
      ).toBeVisible();
      expect(
        await screen.findByRole('option', { name: 'option 2' }),
      ).toBeVisible();
      expect(
        await screen.findByRole('option', { name: 'option 3' }),
      ).toBeVisible();

      const optionChosen = options[1]?.options?.[0];
      await userEvent.click(
        screen.getByRole('option', { name: optionChosen?.label }),
      );

      await waitFor(() =>
        expect(screen.queryByRole('option')).not.toBeInTheDocument(),
      );
      expect(handleSelect).toHaveBeenCalledWith(optionChosen);
    });
  });

  it('allows user to select an option', async () => {
    const Wrapper = () => {
      const [selected, setSelected] = React.useState<Option | undefined>(
        undefined,
      );

      return (
        <FormField label="Choose">
          <Select value={selected} options={options} onSelect={setSelected} />
        </FormField>
      );
    };

    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('combobox', { name: /Choose/ }));
    await userEvent.click(
      await screen.findByRole('option', { name: 'option 1' }),
    );

    // Wait for the menu to be removed
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    expect(screen.getByRole('combobox', { name: /Choose/ })).toHaveValue(
      'option 1',
    );
  });

  it('supports a custom render function', async () => {
    const renderOption = (option: Option) => `custom function ${option.label}`;
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <FormField label="Choose">
          <Select
            value={options[0]}
            options={options}
            onSelect={vi.fn()}
            renderOption={renderOption}
          />
        </FormField>
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('combobox', { name: /Choose/ }));
    expect(
      await screen.findByRole('option', { name: 'custom function option 1' }),
    ).toBeVisible();
    expect(
      screen.getByRole('option', { name: 'custom function option 2' }),
    ).toBeVisible();

    await userEvent.click(
      screen.getByRole('option', { name: 'custom function option 1' }),
    );

    // Wait for the menu to be removed
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
  });

  it('supports onBlur and onFocus callback', async () => {
    const handleBlur = vi.fn();
    const handleFocus = vi.fn();
    const Wrapper = () => {
      const [selected, setSelected] = React.useState<Option | undefined>(
        undefined,
      );

      return (
        <>
          <button type="button">Loose focus</button>
          <FormField label="Choose">
            <Select
              value={selected}
              options={options}
              onSelect={setSelected}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </FormField>
        </>
      );
    };

    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    expect(handleFocus).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('combobox', { name: /Choose/ }));
    expect(handleFocus).toHaveBeenCalled();
    expect(handleBlur).not.toHaveBeenCalled();

    await userEvent.click(
      await screen.findByRole('option', { name: 'option 1' }),
    );

    // Wait for the menu to be removed
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    await userEvent.click(screen.getByRole('button', { name: 'Loose focus' }));

    expect(handleBlur).toHaveBeenCalled();
  });

  it('disables input when isDisabled is true', async () => {
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <FormField label="Choose">
          <Select
            value={options[0]}
            options={options}
            onSelect={vi.fn()}
            isDisabled
          />
        </FormField>
      </GrapesProvider>,
    );
    expect(screen.getByRole('combobox', { name: /Choose/ })).toBeDisabled();

    await userEvent.click(screen.getByRole('combobox', { name: /Choose/ }));
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('should have a label on the drop down', async () => {
    render(
      <GrapesProvider locale="fr-FR" localesDefinition={LOCALES}>
        <FormField label="Choose">
          <Select value={options[0]} options={options} onSelect={vi.fn()} />
        </FormField>
      </GrapesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Show options' })).toBeVisible();
  });

  it('sets props name, placeholder and id to the input', () => {
    const name = 'select';
    const placeholder = 'select an option';
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <FormField label="Choose">
          <Select
            value={options[0]}
            options={options}
            onSelect={vi.fn()}
            name={name}
            placeholder={placeholder}
          />
        </FormField>
      </GrapesProvider>,
    );

    const input = screen.getByRole('combobox', { name: /Choose/ });
    expect(input).toHaveAttribute('name', name);
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  describe('Given an option is disabled', () => {
    it(`it's not possible to select it`, async () => {
      const name = 'select';
      const onSelect = vi.fn();
      const newOptions = options.concat([
        { key: '3', label: 'option 3', disabled: true },
      ]);
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <FormField label="Choose">
            <Select
              value={newOptions[0]}
              options={newOptions}
              onSelect={onSelect}
              name={name}
            />
          </FormField>
        </GrapesProvider>,
      );

      await userEvent.click(screen.getByRole('combobox', { name: /Choose/ }));
      await userEvent.click(
        await screen.findByRole('option', { name: 'option 3' }),
      );

      expect(onSelect).not.toHaveBeenCalled();
      expect(screen.getByRole('combobox', { name: /Choose/ })).toHaveValue(
        'option 1',
      );
    });
  });
});
