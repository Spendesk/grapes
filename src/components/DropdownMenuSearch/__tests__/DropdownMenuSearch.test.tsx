import React from 'react';
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ComboboxOption } from '../../Combobox';
import { DropdownMenuSearch } from '../';
import { Button } from '../../Button';

const costCenters = [
  { key: '1', label: 'Marketing' },
  { key: '2', label: 'Legal' },
  { key: '3', label: 'Office' },
];

const triggerButtonNoOptionLabel = 'Select a cost center';
const searchPlaceholder = 'Type to search a cost center';

const DropdownMenuSearchWrapper = () => {
  const [options, setOptions] = React.useState(costCenters);
  const [selectedOption, setSelectedOption] =
    React.useState<(typeof costCenters)[number]>();
  const buttonLabel = selectedOption?.label ?? triggerButtonNoOptionLabel;

  return (
    <DropdownMenuSearch
      value={selectedOption}
      options={options}
      renderTrigger={(toggleButtonProps) => (
        <Button
          {...toggleButtonProps}
          variant="tertiaryNeutral"
          text={buttonLabel}
        />
      )}
      renderNoOptions={(rawValue) => (
        <div>There are no results for {rawValue}</div>
      )}
      onSearch={(value) => {
        setOptions(value ? filterCompanies(value) : costCenters);
      }}
      onSelect={(option) => {
        setSelectedOption(option);
      }}
      placeholder={searchPlaceholder}
    />
  );
};

export const renderDropdownMenuSearch = () =>
  act(() => {
    render(<DropdownMenuSearchWrapper />);
  });

const displayDropdownAndAssert = async () => {
  expect(
    screen.queryByPlaceholderText(searchPlaceholder),
  ).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button'));
  await assertOptionsInDropdown(costCenters);
};

const searchAndAssert = async (search: string) => {
  const expectedCompanies = filterCompanies(search);

  await userEvent.type(screen.getByRole('combobox'), search);
  await waitFor(() =>
    expect(screen.getAllByRole('option')).toHaveLength(
      expectedCompanies.length,
    ),
  );
  await assertOptionsInDropdown(expectedCompanies);
};

const clickOptionAndAssert = async (option: ComboboxOption) => {
  await userEvent.click(screen.getByRole('option', { name: option.label }));
  await waitForElementToBeRemoved(
    screen.queryByPlaceholderText(searchPlaceholder),
  );
  expect(screen.getByRole('button')).toHaveTextContent(option.label);
};

const assertOptionsInDropdown = (costCenters: ComboboxOption[]) => {
  costCenters.forEach((costCenter) => {
    expect(
      screen.getByRole('option', { name: costCenter.label }),
    ).toBeVisible();
  });
};

const filterCompanies = (value: string): ComboboxOption[] =>
  costCenters.filter((costCenter) =>
    costCenter.label.toLowerCase().includes(value.toLowerCase()),
  );

describe('DropdownMenuSearch component', () => {
  it('allows user to choose an option', async () => {
    await renderDropdownMenuSearch();
    await displayDropdownAndAssert();
    await clickOptionAndAssert(costCenters[1]);
  });

  it('allows to search and select an option', async () => {
    const facebookCompany = costCenters[2];

    await renderDropdownMenuSearch();
    await displayDropdownAndAssert();
    await searchAndAssert(facebookCompany.label.substring(0, 3));
    await clickOptionAndAssert(facebookCompany);
  });
});
