import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithGrapesProvider } from '../../test-utils/renderers';

import { Toast } from './';

describe('Toast component', () => {
  it('should display a Toast and add the ability to close it', async () => {
    const handleClose = vi.fn();
    const title = 'Your receipt has been uploaded';
    renderWithGrapesProvider(<Toast title={title} onClose={handleClose} />);

    expect(screen.getByRole('status', { name: title })).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('should support one custom action', async () => {
    const handleClose = vi.fn();
    const handleClick = vi.fn();
    const title = 'Your receipt has been uploaded';
    renderWithGrapesProvider(
      <Toast
        title={title}
        onClose={handleClose}
        action={{ text: 'Add another', onClick: handleClick }}
      />,
    );

    expect(screen.getByRole('status', { name: title })).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Add another' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should render children as a description', () => {
    const title = 'Your receipt has been uploaded';
    const description = 'Description (optional)';
    renderWithGrapesProvider(
      <Toast title={title} onClose={vi.fn()}>
        {description}
      </Toast>,
    );

    expect(
      screen.getByRole('status', { name: title }),
    ).toHaveAccessibleDescription(description);
  });
});
