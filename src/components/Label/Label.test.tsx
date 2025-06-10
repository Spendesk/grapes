import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Label } from './';

describe('Label component', () => {
  describe('given default props', () => {
    it('renders the label', () => {
      render(<Label label="My Label" />);
      expect(screen.getByText('My Label')).toBeVisible();
    });
  });

  describe('given an input', () => {
    it('allows linking the input to the label', () => {
      const MyInput = () => (
        <div>
          <Label htmlFor="myInput" label="My label" />
          <input id="myInput" />
        </div>
      );
      render(<MyInput />);

      expect(screen.getByRole('textbox', { name: 'My label' })).toBeVisible();
    });
  });

  describe('given a `hint` props', () => {
    it('displays its content as child', () => {
      render(<Label label="My label" hint="Optional" />);

      expect(screen.getByText('Optional')).toBeVisible();
    });

    it('does not affect the label of the input', () => {
      render(
        <div>
          <Label htmlFor="myInput" label="My label" hint="Optional" />
          <input id="myInput" />
        </div>,
      );

      expect(screen.getByRole('textbox')).toHaveAccessibleName('My label');
    });
  });

  describe('given a `infoTipContent` as props', () => {
    it('displays a Tooltip element with the `infoTipContent` as content', () => {
      render(<Label label="My label" infoTipContent="Something helpful" />);

      fireEvent.mouseEnter(screen.getByRole('img'), { bubbles: true });
      expect(
        screen.getByRole('tooltip', { name: 'Something helpful' }),
      ).toBeVisible();

      fireEvent.mouseLeave(screen.getByRole('img'), { bubbles: true });
      expect(
        screen.queryByRole('tooltip', { name: 'Something helpful' }),
      ).not.toBeInTheDocument();
    });
  });
});
