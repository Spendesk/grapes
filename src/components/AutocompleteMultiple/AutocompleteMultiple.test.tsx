import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AutocompleteMultiple } from './';
import { FormField } from '../FormField';
import { AutocompleteNoOptions } from '../AutocompleteNoOptions';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import { GrapesProvider } from '../GrapesProvider';

describe('AutocompleteMultiple component', () => {
  type Option = (typeof availableOptions)[number];
  const availableOptions = [
    { key: '1', label: 'Marketing' },
    { key: '2', label: 'Legal' },
    { key: '3', label: 'Office' },
    { key: '4', label: 'Platform' },
    { key: '5', label: 'Finance' },
    { key: '6', label: 'Recruitment' },
    { key: '7', label: 'Growth' },
    { key: '8', label: 'Management' },
  ];

  it('allows user to select and search for multiple options', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
        [],
      );

      return (
        <FormField label="Cost center">
          <AutocompleteMultiple
            values={selectedOptions}
            options={options}
            translations={{
              selectAll: `Select all (${options.length} items)`,
              selected: `${selectedOptions.length} items selected`,
            }}
            onSearch={(value) => {
              if (!value) {
                setOptions(availableOptions);
                return;
              }
              setOptions(
                availableOptions.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                ),
              );
            }}
            onSelect={setSelectedOptions}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('button'));

    // AutocompleteMultiple displays all options AND a select all options
    await waitFor(() =>
      expect(screen.getAllByRole('option')).toHaveLength(
        availableOptions.length + 1,
      ),
    );
    expect(screen.getByRole('option', { name: 'Marketing' })).toBeVisible();

    await userEvent.type(
      screen.getByRole('combobox', { name: 'Cost center' }),
      'Ma',
    );

    // Wait for the loading and ensure only option containing Ma are presents
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(3));

    await userEvent.click(screen.getByRole('option', { name: 'Marketing' }));
    await userEvent.click(screen.getByRole('option', { name: 'Management' }));

    // Close listbox
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    expect(await screen.findByText('2 items selected')).toBeVisible();
  });

  it('allows user to select and unselect multiple options', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
        [],
      );

      return (
        <FormField label="Cost center">
          <AutocompleteMultiple
            values={selectedOptions}
            options={options}
            translations={{
              selectAll: `Select all (${options.length} items)`,
              selected: `${selectedOptions.length} items selected`,
            }}
            onSearch={(value) => {
              if (!value) {
                setOptions(availableOptions);
                return;
              }
              setOptions(
                availableOptions.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                ),
              );
            }}
            onSelect={setSelectedOptions}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('button'));
    const marketingOption = await screen.findByRole('option', {
      name: 'Marketing',
    });

    await userEvent.click(await within(marketingOption).findByRole('checkbox'));
    await userEvent.click(
      await within(
        screen.getByRole('option', { name: 'Management' }),
      ).findByRole('checkbox'),
    );

    await userEvent.click(await within(marketingOption).findByRole('checkbox'));

    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('1 items selected')).toBeVisible();
  });

  it('displays options list on click and remove it when focus is lost', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
        [],
      );

      return (
        <>
          <button>focus</button>
          <FormField label="Cost Center">
            <AutocompleteMultiple
              values={selectedOptions}
              options={options}
              translations={{
                selectAll: `Select all (${options.length} items)`,
                selected: `${selectedOptions.length} items selected`,
              }}
              onSearch={(value) => {
                if (!value) {
                  setOptions(availableOptions);
                  return;
                }
                setOptions(
                  availableOptions.filter((option) =>
                    option.label.toLowerCase().includes(value.toLowerCase()),
                  ),
                );
              }}
              onSelect={setSelectedOptions}
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

    await userEvent.click(
      screen.getByRole('combobox', { name: 'Cost Center' }),
    );
    expect(
      await screen.findByRole('option', { name: 'Marketing' }),
    ).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'focus' }));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
  });

  it('displays the menu with no Select all item', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
        [],
      );

      return (
        <AutocompleteMultiple
          values={selectedOptions}
          options={options}
          translations={{
            selected: `${selectedOptions.length} items selected`,
          }}
          onSearch={(value) => {
            if (!value) {
              setOptions(availableOptions);
              return;
            }
            setOptions(
              availableOptions.filter((option) =>
                option.label.toLowerCase().includes(value.toLowerCase()),
              ),
            );
          }}
          onSelect={setSelectedOptions}
        />
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findAllByRole('option')).toHaveLength(
      availableOptions.length,
    );

    // Close listbox
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
  });

  it('display no options when nothing is found', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
        [],
      );

      return (
        <FormField label="Cost center">
          <AutocompleteMultiple
            values={selectedOptions}
            options={options}
            translations={{
              selected: `${selectedOptions.length} items selected`,
            }}
            renderNoOptions={(rawValue) => (
              <AutocompleteNoOptions>
                <div>There are no results for {rawValue}</div>
              </AutocompleteNoOptions>
            )}
            onSearch={(value) => {
              if (!value) {
                setOptions(availableOptions);
                return;
              }
              setOptions(
                availableOptions.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                ),
              );
            }}
            onSelect={setSelectedOptions}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('button'));

    // AutocompleteMultiple displays all options
    expect(await screen.findAllByRole('option')).toHaveLength(
      availableOptions.length,
    );
    expect(screen.getByRole('option', { name: 'Marketing' })).toBeVisible();

    await userEvent.type(
      screen.getByRole('combobox', { name: 'Cost center' }),
      'Unknown',
    );

    // Wait for the loading and ensure no options are present
    await waitFor(() =>
      expect(
        screen.getByText('There are no results for Unknown'),
      ).toBeVisible(),
    );

    // Close listbox
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(
        screen.queryByText('There are no results for Unknown'),
      ).not.toBeInTheDocument(),
    );
  });

  it('allows user to select and async search for multiple options', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
        [],
      );

      return (
        <FormField label="Cost center">
          <AutocompleteMultiple
            values={selectedOptions}
            options={options}
            translations={{
              selected: `${selectedOptions.length} items selected`,
            }}
            onSearch={async (value) => {
              if (value === undefined || value.length === 0) {
                setOptions(availableOptions);
                return;
              }

              await new Promise((resolve) => setTimeout(resolve, 500));

              setOptions(
                availableOptions.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                ),
              );
            }}
            onSelect={setSelectedOptions}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('button'));

    // AutocompleteMultiple displays all options
    expect(await screen.findAllByRole('option')).toHaveLength(
      availableOptions.length,
    );
    expect(
      await screen.findByRole('option', { name: 'Marketing' }),
    ).toBeVisible();

    await userEvent.type(
      screen.getByRole('combobox', { name: 'Cost center' }),
      'Ma',
    );

    // Make sure the loading appeared and was later removed
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-busy', 'true');

    // Wait for the loading and ensure only option containing Sp are present
    await waitFor(
      () =>
        expect(screen.getByRole('listbox')).toHaveAttribute(
          'aria-busy',
          'false',
        ),
      {
        timeout: 1000,
      },
    );
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(2), {
      timeout: 1000,
    });

    const marketingOption = await screen.findByRole('option', {
      name: 'Marketing',
    });
    await userEvent.click(marketingOption);
    expect(
      await within(marketingOption).findByRole('checkbox', { checked: true }),
    ).toBeChecked();

    const managementOption = await screen.findByRole('option', {
      name: 'Management',
    });
    await userEvent.click(managementOption);
    expect(
      await within(managementOption).findByRole('checkbox', { checked: true }),
    ).toBeChecked();

    // Close listbox
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    expect(await screen.findByText('2 items selected')).toBeVisible();
  });

  it('displays the placeholder when no options nor values are available', async () => {
    const Wrapper = () => {
      return (
        <FormField label="Cost center">
          <AutocompleteMultiple
            values={[]}
            options={[]}
            translations={{
              selected: `0 items selected`,
            }}
            onSearch={async () => {}}
            onSelect={vi.fn()}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    expect(
      screen.queryByRole('button', { name: '0 items selected' }),
    ).not.toBeInTheDocument();
  });

  it('allow user to select all options', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
        [],
      );

      return (
        <FormField label="Cost center">
          <AutocompleteMultiple
            values={selectedOptions}
            options={options}
            translations={{
              selectAll: 'Select all items',
              selected: `${selectedOptions.length} items selected`,
            }}
            onSearch={(value) => {
              if (!value) {
                setOptions(availableOptions);
                return;
              }
              setOptions(
                availableOptions.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                ),
              );
            }}
            onSelect={setSelectedOptions}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Show options' }));
    await userEvent.click(
      await screen.findByRole('option', { name: 'Select all items' }),
    );
    // Close autocomplete
    await userEvent.click(screen.getByRole('button', { name: 'Show options' }));

    expect(await screen.findByText('8 items selected')).toBeVisible();

    await userEvent.click(
      screen.getByRole('button', { name: '8 items selected' }),
    );
    // Unselect all options
    await userEvent.click(
      await screen.findByRole('option', { name: 'Select all items' }),
    );
    await userEvent.click(screen.getByRole('button', { name: 'Show options' }));

    expect(screen.queryByText('8 items selected')).not.toBeInTheDocument();
  });

  it('allow user to clear option with one button', async () => {
    const Wrapper = () => {
      const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([
        availableOptions[0],
        availableOptions[1],
      ]);

      return (
        <FormField label="Cost center">
          <AutocompleteMultiple
            showClearSelectionButton
            values={selectedOptions}
            options={availableOptions}
            translations={{
              selectAll: 'Select all items',
              selected: `${selectedOptions.length} items selected`,
            }}
            onSearch={() => void {}}
            onSelect={setSelectedOptions}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    expect(screen.getByText('2 items selected')).toBeVisible();

    // showClearSelectionButton;
    await userEvent.click(
      screen.getByRole('button', { name: 'Clear selection' }),
    );

    expect(screen.queryByText('2 items selected')).not.toBeInTheDocument();
  });

  describe('given some option groups', () => {
    const availableOptions = [
      {
        key: 'mickael-murphy',
        label: 'Mickael Murphy',
        options: [
          {
            key: 'marketing',
            label: 'Marketing',
          },
          {
            key: 'legal',
            label: 'Legal',
          },
        ],
      },
      {
        key: 'nicolas-harvey',
        label: 'Nicolas Harvey',
        options: [
          {
            key: 'office',
            label: 'Office',
          },
          {
            key: 'platform',
            label: 'Platform',
          },
        ],
      },
      {
        key: 'finance',
        label: 'Finance',
      },
      {
        key: 'laura-lagarde',
        label: 'Laura Lagarde',
        options: [
          {
            key: 'management',
            label: 'Management',
          },
        ],
      },
    ];

    it('allows user to select an option in a group', async () => {
      const Wrapper = () => {
        const [options, setOptions] = React.useState(availableOptions);
        const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(
          [],
        );

        return (
          <FormField label="Cost center">
            <AutocompleteMultiple
              values={selectedOptions}
              options={options}
              translations={{
                selectAll: `Select all (${
                  options.flatMap((option) =>
                    'options' in option ? option.options : option,
                  ).length
                } items)`,
                selected: `${selectedOptions.length} items selected`,
              }}
              onSearch={(value) => {
                if (!value) {
                  setOptions(availableOptions);
                  return;
                }
                setOptions(
                  availableOptions.flatMap((option) => {
                    if ('options' in option) {
                      return option.label
                        .toLowerCase()
                        .includes(value.toLowerCase())
                        ? option
                        : {
                            ...option,
                            options: option.options?.filter((subOption) =>
                              subOption.label
                                .toLowerCase()
                                .includes(value.toLowerCase()),
                            ),
                          };
                    }
                    return option.label
                      .toLowerCase()
                      .includes(value.toLowerCase())
                      ? option
                      : [];
                  }),
                );
              }}
              onSelect={setSelectedOptions}
            />
          </FormField>
        );
      };
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <Wrapper />
        </GrapesProvider>,
      );

      await userEvent.click(screen.getByRole('button'));

      // AutocompleteMultiple displays all options AND a select all options
      await waitFor(() =>
        expect(screen.getAllByRole('option')).toHaveLength(
          availableOptions.flatMap((option) =>
            'options' in option ? option.options : option,
          ).length + 1,
        ),
      );
      expect(screen.getByRole('option', { name: 'Marketing' })).toBeVisible();

      await userEvent.type(
        screen.getByRole('combobox', { name: 'Cost center' }),
        'Ma',
      );

      // Wait for the loading and ensure only option containing Sp are present
      await waitFor(() =>
        expect(screen.getAllByRole('option')).toHaveLength(3),
      );

      await userEvent.click(screen.getByRole('option', { name: 'Marketing' }));
      await userEvent.click(screen.getByRole('option', { name: 'Management' }));

      // Close listbox
      await userEvent.click(screen.getByRole('button'));
      await waitFor(() =>
        expect(screen.queryByRole('option')).not.toBeInTheDocument(),
      );

      expect(await screen.findByText('2 items selected')).toBeVisible();
    });
  });
});
