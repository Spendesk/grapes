import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DeprecatedPreview } from './';

describe('DeprecatedPreview component', () => {
  describe('given default props', () => {
    it('has a button with the primary text from props as child', () => {
      render(<DeprecatedPreview primaryText="My text" />);

      expect(screen.getByRole('button', { name: 'My text' })).toBeVisible();
    });
  });

  describe('given a `secondaryText` props', () => {
    it('has a button with the primary and secondary texts from props as child', () => {
      render(
        <DeprecatedPreview
          primaryText="My text"
          secondaryText="Secondary text"
        />,
      );
      expect(
        screen.getByRole('button', { name: 'My text | Secondary text' }),
      ).toBeVisible();
    });
  });

  describe('given a `rightAddon` props', () => {
    it('displays its content', () => {
      render(
        <DeprecatedPreview primaryText="My text" rightAddon={<p>addon</p>} />,
      );
      expect(screen.getByRole('button', { name: /addon$/ })).toBeVisible();
    });
  });

  describe('given `onClick` props', () => {
    it('calls `onClick` when clicking on the button', async () => {
      const handleClick = vi.fn();
      render(<DeprecatedPreview primaryText="My text" onClick={handleClick} />);

      await userEvent.click(screen.getByRole('button', { name: 'My text' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('given a `className` props', () => {
    it("adds it to the component's classnames", () => {
      render(
        <DeprecatedPreview
          primaryText="My text"
          className="MyDeprecatedPreview"
        />,
      );
      expect(screen.getByRole('button', { name: 'My text' })).toHaveClass(
        'MyDeprecatedPreview',
      );
    });
  });
});
