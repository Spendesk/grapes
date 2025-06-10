import React from 'react';
import { render, screen } from '@testing-library/react';

import { NavigationItem } from './';

describe('NavigationItem component', () => {
  describe('given default props', () => {
    it('has a `div` as child by default and displays the label inside of it', () => {
      render(<NavigationItem text="Accounting integration" />);
      expect(screen.getByText('Accounting integration')).toBeVisible();
    });
  });

  describe('given a `component` props', () => {
    it("doesn't display the `div` anymore", () => {
      render(
        <NavigationItem
          text="Accounting integration"
          component="a"
          href="/accounting-integration"
        />,
      );

      expect(
        screen.getByRole('link', { name: 'Accounting integration' }),
      ).toBeVisible();
      expect(
        screen.getByRole('link', { name: 'Accounting integration' }),
      ).toHaveAttribute('href', '/accounting-integration');
    });
  });

  describe('given addon props', () => {
    it('renders the leftAddons and rightAddons when provided', () => {
      render(
        <NavigationItem
          text="Accounting integration"
          href="/accounting-integration"
          leftAddon={<p>Left addon</p>}
          rightAddon={<p>Right addon</p>}
        />,
      );

      expect(screen.getByText('Left addon')).toBeVisible();
      expect(screen.getByText('Right addon')).toBeVisible();
    });
  });
});
