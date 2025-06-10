import React from 'react';
import { render, screen } from '@testing-library/react';

import { GrapesProvider } from '../GrapesProvider/GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import { Tag } from './';
import userEvent from '@testing-library/user-event';

describe('Tag component', () => {
  it('displays the text from props', () => {
    render(<Tag>Tag</Tag>);

    expect(screen.getByText('Tag')).toBeVisible();
  });

  it('displays a close button when onClose is provided', async () => {
    const handleClose = vi.fn();
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <Tag iconName="archive" onClose={handleClose}>
          Tag
        </Tag>
        );
      </GrapesProvider>,
    );

    expect(screen.getByText('Tag')).toBeVisible();

    expect(handleClose).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleClose).toHaveBeenCalled();
  });

  describe('given accessibility attribut', () => {
    it('adds relevant ARIA attributs to target it', () => {
      render(<Tag variant="carbon">Tag</Tag>);

      expect(screen.getByRole('status', { name: 'Tag' })).toBeVisible();
    });
  });
});
