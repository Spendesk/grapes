import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from '.';

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

describe('Tooltip component', () => {
  it('displays content when user hover the children component', async () => {
    render(
      <Tooltip content="My tooltip">
        <p>Hi!</p>
      </Tooltip>,
    );

    expect(screen.getByText('Hi!')).toBeVisible();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByText('Hi!'), { bubbles: true });
    await act(async () => {});
    expect(
      await screen.findByRole('tooltip', { name: 'My tooltip' }),
    ).toBeVisible();

    fireEvent.mouseLeave(screen.getByText('Hi!'), { bubbles: true });
    expect(
      screen.queryByRole('tooltip', { name: 'My tooltip' }),
    ).not.toBeInTheDocument();
  });

  it('does not show a tooltip if content prop is not defined or empty', async () => {
    render(
      <Tooltip content="">
        <p>No tooltip</p>
      </Tooltip>,
    );
    await act(async () => {});

    await userEvent.hover(screen.getByText('No tooltip'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not show a tooltip if isDisabled prop is true', async () => {
    render(
      <Tooltip content="My tooltip" isDisabled>
        <p>No tooltip</p>
      </Tooltip>,
    );
    await act(async () => {});

    await userEvent.hover(screen.getByText('No tooltip'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows a tooltip without having to hover if isOpen prop is true', async () => {
    render(
      <Tooltip content="My tooltip" isOpen>
        <p>Tooltip</p>
      </Tooltip>,
    );
    await act(async () => {});

    expect(screen.getByRole('tooltip', { name: 'My tooltip' })).toBeVisible();
  });
});
