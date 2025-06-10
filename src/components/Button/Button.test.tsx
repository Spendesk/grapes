import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './';

describe('Button component', () => {
  describe('given default props', () => {
    it('should render an enabled button with a text', () => {
      render(<Button variant="secondaryNeutral" text="Click me" />);

      const btnElement = screen.getByRole('button', { name: 'Click me' });
      expect(btnElement).toBeVisible();
      expect(btnElement).toBeEnabled();
    });
  });

  describe('given a `className` props', () => {
    it("adds it to the component's classnames", () => {
      render(
        <Button
          className="MyButton"
          variant="secondaryNeutral"
          text="Click me"
        />,
      );
      expect(screen.getByRole('button', { name: 'Click me' })).toHaveClass(
        'MyButton',
      );
    });
  });

  describe('given `isDisabled` props set to true', () => {
    it('has a disabled button as child', () => {
      render(<Button isDisabled variant="secondaryNeutral" text="Click me" />);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();
    });
  });

  describe('`type` props', () => {
    it('set the type to button by default', () => {
      render(<Button variant="secondaryNeutral" text="Click me" />);
      expect(screen.getByRole('button', { name: 'Click me' })).toHaveAttribute(
        'type',
        'button',
      );
    });

    it('set the type to the given type value', () => {
      render(
        <Button type="submit" variant="secondaryNeutral" text="Click me" />,
      );
      expect(screen.getByRole('button', { name: 'Click me' })).toHaveAttribute(
        'type',
        'submit',
      );
    });
  });

  describe('given `onClick` props', () => {
    it('calls `onClick` when clicking on the button', async () => {
      const handleClick = vi.fn();
      render(
        <Button
          variant="secondaryNeutral"
          text="Click me"
          onClick={handleClick}
        />,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables the button while onClick is pending', async () => {
      let resolveHandler = (value: unknown) => value;
      const handleClick = () =>
        new Promise((resolve) => {
          resolveHandler = resolve;
        });
      render(
        <Button
          variant="secondaryNeutral"
          text="Click me"
          onClick={handleClick}
        />,
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toBeDisabled();

      resolveHandler(1);
      await waitFor(() => expect(screen.getByRole('button')).toBeEnabled());
    });
  });

  describe('given `isLoading` props', () => {
    it('has a disabled button as child', () => {
      render(<Button isLoading variant="secondaryNeutral" text="Click me" />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('given component set as an anchor', () => {
    it('should render an anchor', () => {
      render(
        <Button component="a" href="https://spendesk.com/" text="Click me" />,
      );
      expect(screen.getByRole('link', { name: 'Click me' })).toBeVisible();
      expect(screen.getByRole('link', { name: 'Click me' })).toHaveProperty(
        'href',
        'https://spendesk.com/',
      );
    });
  });
});
