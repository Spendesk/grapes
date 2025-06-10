import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ModalContent } from './';
import { renderWithGrapesProvider } from '../../test-utils/renderers';

describe('ModalContent component', () => {
  it('displays a content and a close button when onClose is provided', async () => {
    const handleClose = vi.fn();
    renderWithGrapesProvider(
      <ModalContent onClose={handleClose}>
        <p>Content</p>
      </ModalContent>,
    );

    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText('Content')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClose).toHaveBeenCalled();
  });
});
