import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { type SelectAddonOption, SelectAddon } from './';

describe('SelectAddon', () => {
  const options = [
    { key: '1', label: 'option 1' },
    { key: '2', label: 'option 2' },
  ];

  describe('given default props', () => {
    describe('when opening the menu', () => {
      it('allows user to select an option', async () => {
        const Wrapper = () => {
          const [value, setValue] = React.useState<
            SelectAddonOption | undefined
          >(undefined);

          return (
            <SelectAddon
              value={value}
              options={options}
              onSelect={setValue}
              renderSelectedItem={(selectedItem) => selectedItem.label}
            />
          );
        };
        render(<Wrapper />);

        // open menu
        await userEvent.click(screen.getByRole('combobox'));

        expect(screen.getByRole('listbox')).toBeVisible();
        expect(
          await screen.findByRole('option', { name: 'option 1' }),
        ).toBeVisible();
        expect(screen.getByRole('option', { name: 'option 2' })).toBeVisible();

        await userEvent.click(screen.getByRole('option', { name: 'option 1' }));
        await waitFor(() =>
          expect(screen.queryByRole('option')).not.toBeInTheDocument(),
        );

        expect(screen.getByText('option 1')).toBeVisible();
      });
    });
  });

  describe('given a `renderOption` props with two options with one of them selected', () => {
    it('calls `renderOption` function with the right options', async () => {
      const renderOption = vi.fn((option: { label: string }) => option.label);
      render(
        <SelectAddon
          value={options[1]}
          options={options}
          renderOption={renderOption}
          onSelect={vi.fn()}
          renderSelectedItem={(selectedItem) => selectedItem.label}
        />,
      );

      // Open menu
      await userEvent.click(screen.getByRole('combobox'));

      // Wait for animation to finish
      await waitFor(() => {
        expect(renderOption).toHaveBeenNthCalledWith(1, options[0], {
          isSelected: false,
        });
      });

      expect(renderOption).toHaveBeenNthCalledWith(2, options[1], {
        isSelected: true,
      });

      // Close menu
      await userEvent.click(screen.getByRole('option', { name: 'option 1' }));
      await waitFor(() =>
        expect(screen.queryByRole('option')).not.toBeInTheDocument(),
      );
    });
  });

  describe('given an `isDisabled` props', () => {
    it('disables the button', () => {
      render(
        <SelectAddon
          isDisabled
          value={options[1]}
          options={options}
          onSelect={vi.fn()}
          renderSelectedItem={(selectedItem) => selectedItem.label}
        />,
      );

      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });

  describe('given an `ariaLabel` props', () => {
    it('sets the aria-label attribute', () => {
      render(
        <SelectAddon
          aria-label="test"
          value={options[1]}
          options={options}
          onSelect={vi.fn()}
          renderSelectedItem={(selectedItem) => selectedItem.label}
        />,
      );

      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-label',
        'test',
      );
    });
  });

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

    describe('when opening the menu', () => {
      it('allows user to select an option in a group', async () => {
        const Wrapper = () => {
          const [value, setValue] = React.useState<
            SelectAddonOption | undefined
          >(undefined);

          return (
            <SelectAddon
              value={value}
              options={options}
              onSelect={setValue}
              renderSelectedItem={(selectedItem) => selectedItem.label}
            />
          );
        };
        render(<Wrapper />);

        // Open menu
        await userEvent.click(screen.getByRole('combobox'));

        // Check if the options are visible
        expect(screen.getByRole('listbox')).toBeVisible();
        expect(screen.getByRole('option', { name: 'option 1' })).toBeVisible();
        expect(screen.getByRole('option', { name: 'option 2' })).toBeVisible();
        expect(screen.getByRole('option', { name: 'option 3' })).toBeVisible();

        // Close menu
        await userEvent.click(screen.getByRole('option', { name: 'option 2' }));
        await waitFor(() =>
          expect(screen.queryByRole('option')).not.toBeInTheDocument(),
        );
        expect(screen.getByText('option 2')).toBeVisible();
      });
    });

    describe('given a `renderOptionGroup` props with three options with one in the group selected', () => {
      it('calls `renderOptionGroup` function with the right parameters', async () => {
        const renderOptionGroup = vi.fn(
          (option: { label: string }) => option.label,
        );
        render(
          <SelectAddon
            value={options[1]}
            options={options}
            renderOptionGroup={renderOptionGroup}
            onSelect={vi.fn()}
            renderSelectedItem={(selectedItem) => selectedItem.label}
          />,
        );

        await userEvent.click(screen.getByRole('combobox'));
        expect(renderOptionGroup).toHaveBeenNthCalledWith(1, options[1]);
      });
    });
  });
});
