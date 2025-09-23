import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
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

  describe('Given a search bar has search bar in dropdown enabeld', () => {
    it('shows a dropdown search bar and focuses it on open', async () => {
      const Wrapper = () => {
        const [selected, setSelected] = React.useState<Option | undefined>();
        const [opts, setOpts] = React.useState(options);
        return (
          <FormField label="Choose">
            <Select
              hasSearchBar
              value={selected}
              options={opts}
              onSelect={setSelected}
              searchPlaceholder="Search"
              onSearch={(q) => {
                if (!q) return setOpts(options);
                const lower = q.toLowerCase();
                setOpts(
                  options.filter((o) => o.label.toLowerCase().includes(lower)),
                );
              }}
            />
          </FormField>
        );
      };

      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <Wrapper />
        </GrapesProvider>,
      );

      await userEvent.click(
        screen.getByRole('button', { name: /show options/i }),
      );
      const listbox = await screen.findByRole('listbox');
      const searchInput = within(listbox).getByPlaceholderText(/search/i);
      expect(searchInput).toHaveFocus();
    });

    it('navigates the options with arrow keys when the search bar is used selects the option with Enter', async () => {
      const Wrapper = () => {
        const [opts, setOpts] = React.useState(options);
        const [selected, setSelected] = React.useState<Option | undefined>();
        return (
          <FormField label="Choose">
            <Select
              hasSearchBar
              value={selected}
              options={opts}
              onSelect={setSelected}
              searchPlaceholder="Search"
              onSearch={(q) => {
                if (!q) return setOpts(options);
                const lower = q.toLowerCase();
                setOpts(
                  options.filter((o) => o.label.toLowerCase().includes(lower)),
                );
              }}
            />
          </FormField>
        );
      };

      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <Wrapper />
        </GrapesProvider>,
      );

      // Open and type
      await userEvent.click(
        screen.getByRole('button', { name: /show options/i }),
      );
      const listbox = await screen.findByRole('listbox');
      const searchInput = within(listbox).getByPlaceholderText(/search/i);
      const optionsEls = within(listbox).getAllByRole('option');
      await userEvent.type(searchInput, 'option');

      // ArrowDown highlights first
      await userEvent.keyboard('{ArrowDown}');
      expect(optionsEls[0]).toHaveAttribute('aria-selected', 'true');

      // ArrowDown moves to second
      await userEvent.keyboard('{ArrowDown}');
      expect(optionsEls[1]).toHaveAttribute('aria-selected', 'true');

      // Enter selects the option by pressing enter
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('combobox', { name: /Choose/ })).toHaveValue(
        'option 2',
      );
    });

    it('should have message when no options are found', async () => {
      const Wrapper = () => {
        const [opts, setOpts] = React.useState(options);
        return (
          <FormField label="Choose">
            <Select
              hasSearchBar
              value={options[0]}
              options={opts}
              onSelect={vi.fn()}
              searchPlaceholder="Search"
              renderNoOptions={(q) => (
                <span data-testid="no-results">No results for {q}</span>
              )}
              onSearch={(q) => {
                if (!q) return setOpts(options);
                const lower = q.toLowerCase();
                setOpts(
                  options.filter((o) => o.label.toLowerCase().includes(lower)),
                );
              }}
            />
          </FormField>
        );
      };

      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <Wrapper />
        </GrapesProvider>,
      );

      await userEvent.click(
        screen.getByRole('button', { name: /show options/i }),
      );
      const listbox = await screen.findByRole('listbox');
      const searchInput = within(listbox).getByPlaceholderText(/search/i);
      await userEvent.type(searchInput, 'something'); // yields no matches
      await waitFor(() =>
        expect(within(listbox).queryAllByRole('option')).toHaveLength(0),
      );
      expect(await within(listbox).findByTestId('no-results')).toBeVisible();
    });
  });
});
