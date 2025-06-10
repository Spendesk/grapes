import React, { useState } from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../Button';
import { renderWithGrapesProvider } from '../../test-utils/renderers';

import { PageModal } from './';

describe('PageModal component', () => {
  it('should display a page modal with content', async () => {
    const Container = () => {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <Button
            variant="primaryBrand"
            text="Open"
            onClick={() => setOpen(true)}
          />
          <PageModal title="Title" isOpen={open} onClose={() => setOpen(false)}>
            <div>Content</div>
          </PageModal>
        </div>
      );
    };
    renderWithGrapesProvider(<Container />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(await screen.findByRole('dialog', { name: 'Title' })).toBeVisible();
    expect(screen.getByText('Content')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitForElementToBeRemoved(screen.getByRole('dialog'));
  });

  it('should support additional accessibility attributs', () => {
    const descriptionId = 'dialog-description';

    renderWithGrapesProvider(
      <PageModal
        isOpen
        onClose={vi.fn()}
        title="Title"
        aria-describedby={descriptionId}
      >
        <div id={descriptionId}>Content</div>
      </PageModal>,
    );

    expect(screen.getByRole('dialog', { name: 'Title' })).toBeVisible();
    expect(
      screen.getByRole('dialog', { name: 'Title' }),
    ).toHaveAccessibleDescription('Content');
  });
});
