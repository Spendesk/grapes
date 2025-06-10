import React from 'react';

import { render, screen } from '@testing-library/react';
import { ActionBar, FloatingActionBar } from './';
import { GrapesProvider } from '../GrapesProvider/GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import userEvent from '@testing-library/user-event';

describe('ActionBar component', () => {
  it('should display one button and the content', async () => {
    const handleClick = vi.fn();
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <ActionBar
          actions={[
            {
              text: 'Archive',
              onClick: handleClick,
              iconName: 'archive',
            },
          ]}
        >
          3 selected
        </ActionBar>
      </GrapesProvider>,
    );

    expect(screen.getByRole('toolbar', { name: '3 selected' })).toBeVisible();

    expect(handleClick).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should display a disabled button when isDisabled is set', async () => {
    const handleClick = vi.fn();
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <ActionBar
          actions={[
            {
              text: 'Archive',
              onClick: handleClick,
              iconName: 'archive',
              isDisabled: true,
            },
          ]}
        >
          3 selected
        </ActionBar>
      </GrapesProvider>,
    );

    expect(screen.getByRole('toolbar', { name: '3 selected' })).toBeVisible();

    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Archive' })).toBeDisabled();
  });
});

describe('FloatingActionBar component', () => {
  it('should display one button and the content', async () => {
    const handleClick = vi.fn();
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <FloatingActionBar
          actions={[
            {
              text: 'Archive',
              onClick: handleClick,
              iconName: 'archive',
            },
          ]}
        >
          3 selected
        </FloatingActionBar>
      </GrapesProvider>,
    );

    expect(screen.getByRole('toolbar', { name: '3 selected' })).toBeVisible();

    expect(handleClick).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(handleClick).toHaveBeenCalled();
  });
});
