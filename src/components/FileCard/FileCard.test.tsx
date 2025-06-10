import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FileCard } from '.';
import { renderWithGrapesProvider } from '../../test-utils/renderers';

describe('FileCard component', () => {
  describe('given default props', () => {
    it('has a button with the title from props as child', () => {
      render(
        <FileCard
          title="My text"
          onClick={vi.fn()}
          mimeType="application/pdf"
        />,
      );

      expect(screen.getByRole('article', { name: 'My text' })).toBeVisible();
    });
  });

  describe('given a `className` prop', () => {
    it("adds it to the component's classnames", () => {
      render(
        <FileCard
          title="My text"
          className="MyFileCard"
          onClick={vi.fn()}
          mimeType="image/png"
        />,
      );
      expect(screen.getByRole('article', { name: 'My text' })).toHaveClass(
        'MyFileCard',
      );
    });
  });

  describe('given `onClick` prop', () => {
    it('calls `onClick` when clicking on the button', async () => {
      const handleClick = vi.fn();
      render(<FileCard title="My text" onClick={handleClick} />);

      await userEvent.click(screen.getByRole('button', { name: 'My text' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('given `onDelete` prop', () => {
    it('calls `onDelete` when clicking on the button', async () => {
      const handleDelete = vi.fn();
      renderWithGrapesProvider(
        <FileCard title="My text" onDelete={handleDelete} onClick={vi.fn()} />,
      );

      await userEvent.click(
        screen.getByRole('button', { name: 'Delete My text' }),
      );
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('given `description` prop', () => {
    it('displays the description and label the FileCard', async () => {
      renderWithGrapesProvider(
        <FileCard
          title="My text"
          description="My description"
          onClick={vi.fn()}
        />,
      );

      expect(screen.getByText('My description')).toBeVisible();
      expect(
        screen.getByRole('article', { name: 'My text' }),
      ).toHaveAccessibleDescription('My description');
    });
  });
});
