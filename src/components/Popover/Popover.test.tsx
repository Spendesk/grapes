import React from 'react';
import { classNames } from '../../utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover } from './';
import { Button } from '../Button';

describe('Popover component', () => {
  it('allows user to open and close a dialog', async () => {
    render(
      <Popover
        renderTrigger={(triggerProps, isOpen) => (
          <Button
            variant="primaryBrand"
            text="Manage"
            className={classNames(isOpen && 'open')}
            {...triggerProps}
          />
        )}
      >
        {(close) => (
          <span>
            content of the dropdown
            <button type="button" onClick={close}>
              Close
            </button>
          </span>
        )}
      </Popover>,
    );

    expect(screen.getByRole('button', { name: 'Manage' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Manage' })).not.toHaveClass(
      'open',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Manage' }));

    expect(await screen.findByRole('dialog', { name: 'Manage' })).toBeVisible();
    expect(screen.getByText('content of the dropdown')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Manage' })).toHaveClass('open');

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Manage' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('closes when user click outside', async () => {
    render(
      <>
        <p>outside text</p>
        <Popover
          renderTrigger={(triggerProps) => (
            <Button variant="primaryBrand" text="Manage" {...triggerProps} />
          )}
        >
          {() => <span>content of the dropdown</span>}
        </Popover>
        ,
      </>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Manage' }));

    expect(await screen.findByRole('dialog', { name: 'Manage' })).toBeVisible();
    expect(screen.getByText('content of the dropdown')).toBeVisible();

    await userEvent.click(screen.getByText('outside text'));

    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Manage' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('closes when user focus an outside element', async () => {
    render(
      <>
        <Popover
          renderTrigger={(triggerProps) => (
            <Button variant="primaryBrand" text="Manage" {...triggerProps} />
          )}
        >
          {() => <span>content of the dropdown</span>}
        </Popover>
        <button>button outside</button>
      </>,
    );

    // Open dialog using keyboard
    await userEvent.type(
      screen.getByRole('button', { name: 'Manage' }),
      '{enter}',
    );

    expect(await screen.findByRole('dialog', { name: 'Manage' })).toBeVisible();
    expect(screen.getByText('content of the dropdown')).toBeVisible();

    // Focus button outside using tab key
    await userEvent.tab();

    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Manage' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('opens and closes when user click on the trigger', async () => {
    render(
      <Popover
        renderTrigger={(triggerProps) => (
          <Button variant="primaryBrand" text="Manage" {...triggerProps} />
        )}
      >
        {() => <span>content of the dropdown</span>}
      </Popover>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Manage' }));

    expect(await screen.findByRole('dialog', { name: 'Manage' })).toBeVisible();
    expect(screen.getByText('content of the dropdown')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Manage' }));

    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Manage' }),
      ).not.toBeInTheDocument(),
    );
  });
});
