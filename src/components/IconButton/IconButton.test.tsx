import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IconButton } from './';

describe('IconButton component', () => {
  describe('given default props', () => {
    it('has a button as child with type props set to `button` and not disabled', () => {
      render(
        <IconButton
          iconName="ellipsis-vertical"
          onClick={vi.fn()}
          aria-label="menu"
        />,
      );
      const btnElement = screen.getByRole('button', { name: 'menu' });
      expect(btnElement).toBeVisible();
      expect(btnElement).toBeEnabled();
    });

    it('calls `onClick` when clicking on the button', async () => {
      const handleClick = vi.fn();
      render(
        <IconButton
          iconName="ellipsis-vertical"
          aria-label="menu"
          onClick={handleClick}
        />,
      );
      await userEvent.click(screen.getByRole('button', { name: 'menu' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('adds the attribut title when aria-label is given', async () => {
      const label = 'my beautiful menu';
      render(
        <IconButton
          iconName="ellipsis-vertical"
          aria-label={label}
          onClick={vi.fn()}
        />,
      );
      expect(screen.getByRole('button', { name: label })).toHaveAttribute(
        'title',
        label,
      );
    });
  });

  describe('given a `className` props', () => {
    it("adds it to the component's classnames", () => {
      render(
        <IconButton
          onClick={vi.fn()}
          aria-label="menu"
          iconName="ellipsis-vertical"
          className="MyIconButton"
        />,
      );
      expect(screen.getByRole('button', { name: 'menu' })).toHaveClass(
        'MyIconButton',
      );
    });
  });

  describe('given `isDisabled` props set to true', () => {
    it('has a disabled button as child', async () => {
      const handleClick = vi.fn();
      render(
        <IconButton
          isDisabled
          aria-label="menu"
          iconName="ellipsis-vertical"
          onClick={handleClick}
        />,
      );
      expect(screen.getByRole('button', { name: 'menu' })).toBeDisabled();
      await userEvent.click(screen.getByRole('button', { name: 'menu' }));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
