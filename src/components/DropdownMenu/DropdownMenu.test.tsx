import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownMenu } from './';
import { Button } from '../Button';
import type { TriggerProps } from '../Popover';

describe('DropdownMenu component', () => {
  const options = [
    {
      label: 'Marketing',
      key: 'marketing',
    },
    {
      label: 'Legal',
      key: 'legal',
    },
  ];

  it('allows user to choose an option', async () => {
    const handleSelect = vi.fn();
    render(
      <DropdownMenu
        options={options}
        renderButton={(getToggleButtonProps: () => TriggerProps) => (
          <Button
            {...getToggleButtonProps()}
            variant="tertiaryNeutral"
            text="Who should win?"
          />
        )}
        onSelect={handleSelect}
      />,
    );

    expect(screen.queryByRole('option')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeVisible();
    expect(await screen.findByRole('option', { name: 'Legal' })).toBeVisible();
    expect(
      await screen.findByRole('option', { name: 'Marketing' }),
    ).toBeVisible();

    const optionChosen = options[1];
    await userEvent.click(
      screen.getByRole('option', { name: optionChosen.label }),
    );

    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
    expect(handleSelect).toHaveBeenCalledWith(optionChosen);
  });

  it('keeps menu open when keepOpenOnSelect is given', async () => {
    render(
      <DropdownMenu
        options={options}
        renderButton={(getToggleButtonProps: () => TriggerProps) => (
          <Button
            {...getToggleButtonProps()}
            variant="tertiaryNeutral"
            text="Who should win?"
          />
        )}
        keepOpenOnSelect
      />,
    );

    await userEvent.click(screen.getByRole('button'));

    await userEvent.click(await screen.findByRole('option', { name: 'Legal' }));
    // Menu doesn't close, user can select another legal
    await userEvent.click(screen.getByRole('option', { name: 'Marketing' }));

    // Close menu
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
  });

  it('supports custom renderer for option', async () => {
    render(
      <DropdownMenu
        options={options}
        renderButton={(getToggleButtonProps: () => TriggerProps) => (
          <Button
            {...getToggleButtonProps()}
            variant="tertiaryNeutral"
            text="Who should win?"
          />
        )}
        renderOption={(option) => {
          return (
            <p>
              {option.label} - {option.key}
            </p>
          );
        }}
      />,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(
      await screen.findByRole('option', { name: 'Legal - legal' }),
    ).toBeVisible();
    expect(
      screen.getByRole('option', { name: 'Marketing - marketing' }),
    ).toBeVisible();

    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.queryByRole('option')).not.toBeInTheDocument(),
    );
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

    it('allows user to choose an option in a group', async () => {
      const handleSelect = vi.fn();
      render(
        <DropdownMenu
          options={options}
          renderButton={(getToggleButtonProps: () => TriggerProps) => (
            <Button {...getToggleButtonProps()} text="Who should win?" />
          )}
          onSelect={handleSelect}
        />,
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
});
