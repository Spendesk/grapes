import React, { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GrapesProvider } from '../GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import { AutocompleteNoOptions } from '../AutocompleteNoOptions';
import { FormField } from '../FormField';

import { Autocomplete } from './';
import { DropdownItem } from '../DropdownItem';

describe('Autocomplete component', () => {
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

  it('allows user to select and search for an option', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOption, setSelectedOption] = React.useState<Option>();

      return (
        <FormField label="Cost center">
          <Autocomplete
            value={selectedOption}
            options={options}
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
            onSelect={setSelectedOption}
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
    expect(await screen.findAllByRole('option')).toHaveLength(
      availableOptions.length,
    );
    expect(screen.getByRole('option', { name: 'Office' })).toBeVisible();

    await userEvent.type(
      screen.getByRole('combobox', { name: /Cost center/ }),
      'Ma',
    );

    // Wait for the loading and ensure only option containing Ma are present
    await waitFor(() =>
      expect(screen.getByRole('option', { name: 'Marketing' })).toBeVisible(),
    );
    expect(screen.getByRole('option', { name: 'Management' })).toBeVisible();
    expect(
      screen.queryByRole('option', { name: 'Office' }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('option', { name: 'Marketing' }));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    expect(screen.getByRole('combobox', { name: /Cost center/ })).toHaveValue(
      'Marketing',
    );
  });

  it('displays the selected items when no other item can be found', async () => {
    const Wrapper = () => {
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOption, setSelectedOption] = React.useState<Option>();

      return (
        <FormField label="Cost center">
          <Autocomplete
            value={selectedOption}
            options={options}
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
            onSelect={setSelectedOption}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.type(
      screen.getByRole('combobox', { name: /Cost center/ }),
      'unknown',
    );

    expect(
      await screen.findByText('There are no results for unknown'),
    ).toBeVisible();
    await userEvent.clear(
      screen.getByRole('combobox', { name: /Cost center/ }),
    );

    await userEvent.click(await screen.findByRole('option', { name: 'Legal' }));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    await userEvent.click(screen.getByRole('button'));
    await userEvent.clear(
      screen.getByRole('combobox', { name: /Cost center/ }),
    );
    await userEvent.type(
      screen.getByRole('combobox', { name: /Cost center/ }),
      'unknown',
    );

    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
    expect(screen.getByRole('option', { name: 'Legal' })).toBeVisible();
  });

  it('do not displays options list on focus', async () => {
    const Wrapper = () => {
      const [selectedOption, setSelectedOption] = React.useState<Option>();

      return (
        <FormField label="Cost center">
          <Autocomplete
            value={selectedOption}
            options={availableOptions}
            onSearch={vi.fn()}
            onSelect={setSelectedOption}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.tab();
    expect(screen.getByRole('combobox', { name: 'Cost center' })).toHaveFocus();
    expect(screen.queryByRole('options')).not.toBeInTheDocument();
  });

  it('displays a clear selection button when the prop is active', async () => {
    const Wrapper = () => {
      const [selectedOption, setSelectedOption] = React.useState<Option>();

      return (
        <FormField label="Cost center">
          <Autocomplete
            value={selectedOption}
            options={availableOptions}
            onSearch={vi.fn()}
            onSelect={setSelectedOption}
            showClearSelectionButton
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
    await userEvent.click(await screen.findByRole('option', { name: 'Legal' }));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    // clicking on the "x" clear selection button
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByRole('combobox', { name: 'Cost center' })).toHaveValue(
        '',
      ),
    );

    await userEvent.click(screen.getByRole('button'));
    expect(await screen.findAllByRole('option')).toHaveLength(
      availableOptions.length,
    );
  });

  it('displays a clear selection button even if the prop is initially undefined', async () => {
    const Wrapper = () => {
      const [selectedOption, setSelectedOption] = React.useState<Option>();

      // Set a value after initialization
      React.useEffect(() => {
        setSelectedOption(availableOptions[0]);
      }, []);

      return (
        <FormField label="Cost center">
          <Autocomplete
            value={selectedOption}
            options={availableOptions}
            onSearch={vi.fn()}
            onSelect={setSelectedOption}
            showClearSelectionButton
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await waitFor(() =>
      expect(screen.getByRole('combobox', { name: /Cost center/ })).toHaveValue(
        availableOptions[0].label,
      ),
    );
    // There should be a clear button and its action empties the current value
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByRole('combobox', { name: 'Cost center' })).toHaveValue(
        '',
      ),
    );

    // Back to the open all options button (caret-down)
    await userEvent.click(screen.getByRole('button'));
    expect(await screen.findAllByRole('option')).toHaveLength(
      availableOptions.length,
    );
  });

  it('allows user to create new options', async () => {
    const Wrapper = () => {
      const [searchValue, setSearchValue] = React.useState<
        string | undefined
      >();
      const [options, setOptions] = React.useState(availableOptions);
      const [selectedOption, setSelectedOption] = React.useState<Option>();

      const counter = useRef(8);

      return (
        <FormField label="Cost center">
          <Autocomplete
            value={selectedOption}
            options={options.filter((option) => {
              if (searchValue) {
                return option.label
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }
              return true;
            })}
            showClearSelectionButton
            onSearch={(search) => {
              setSearchValue(search);
            }}
            onAddOption={(newOptionLabel: string) => {
              const newOption = {
                key: `${++counter.current}`,
                label: newOptionLabel,
              };
              setOptions((options) => {
                return options
                  .concat(newOption)
                  .sort((a, b) => a.label.localeCompare(b.label));
              });
              return newOption;
            }}
            renderAddOption={(inputValue) => {
              return <DropdownItem label={<span>Create {inputValue}</span>} />;
            }}
            onSelect={setSelectedOption}
          />
        </FormField>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    await userEvent.type(
      screen.getByRole('combobox', { name: /Cost center/ }),
      'Chromatic',
    );
    await userEvent.click(
      await screen.findByRole('option', { name: 'Create Chromatic' }),
    );
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );

    expect(screen.getByRole('combobox', { name: /Cost center/ })).toHaveValue(
      'Chromatic',
    );

    await userEvent.click(
      screen.getByRole('combobox', { name: /Cost center/ }),
    );
    expect(await screen.findByRole('option', { name: 'Chromatic' }));
  });

  it('resets the value if value is undefined', async () => {
    const Wrapper = () => {
      const [selectedOption, setSelectedOption] = React.useState<
        Option | undefined
      >(availableOptions[0]);

      return (
        <>
          <FormField label="Cost center">
            <Autocomplete
              value={selectedOption}
              onSelect={setSelectedOption}
              options={availableOptions}
              onSearch={vi.fn()}
            />
          </FormField>
          <button onClick={() => setSelectedOption(undefined)}>reset</button>
          <button
            onClick={() => setSelectedOption({ key: '4', label: 'Platform' })}
          >
            Select Platform
          </button>
        </>
      );
    };
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Wrapper />
      </GrapesProvider>,
    );

    expect(screen.getByRole('combobox', { name: /Cost center/ })).toHaveValue(
      'Marketing',
    );

    await userEvent.click(screen.getByRole('button', { name: 'reset' }));
    expect(
      screen.getByRole('combobox', { name: /Cost center/ }),
    ).not.toHaveValue();

    await userEvent.click(
      screen.getByRole('combobox', { name: /Cost center/ }),
    );
    await userEvent.click(
      await screen.findByRole('option', { name: /Marketing/ }),
    );
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
    expect(screen.getByRole('combobox', { name: /Cost center/ })).toHaveValue(
      'Marketing',
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Select Platform' }),
    );
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
    expect(screen.getByRole('combobox', { name: /Cost center/ })).toHaveValue(
      'Platform',
    );
  });

  describe('when opening the menu', () => {
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
        const [selectedOption, setSelectedOption] = React.useState<Option>();

        return (
          <FormField label="Cost center">
            <Autocomplete
              value={selectedOption}
              options={options}
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
              onSelect={setSelectedOption}
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
      expect(await screen.findAllByRole('option')).toHaveLength(
        availableOptions.flatMap((option) =>
          'options' in option ? option.options : option,
        ).length,
      );
      expect(screen.getByRole('option', { name: 'Office' })).toBeVisible();

      await userEvent.type(
        screen.getByRole('combobox', { name: /Cost center/ }),
        'Ma',
      );

      // Wait for the loading and ensure only option containing Ma are present
      await waitFor(() =>
        expect(screen.getByRole('option', { name: 'Marketing' })).toBeVisible(),
      );
      expect(screen.getByRole('option', { name: 'Management' })).toBeVisible();
      expect(
        screen.queryByRole('option', { name: 'Office' }),
      ).not.toBeInTheDocument();

      await userEvent.click(screen.getByRole('option', { name: 'Marketing' }));
      await waitFor(() =>
        expect(screen.queryByRole('option')).not.toBeInTheDocument(),
      );

      expect(screen.getByRole('combobox', { name: /Cost center/ })).toHaveValue(
        'Marketing',
      );
    });
  });
});
