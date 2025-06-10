import React from 'react';

import { render, screen } from '@testing-library/react';
import { Navigation } from './';
import { NavigationItem } from '../NavigationItem';

describe('Navigation component', () => {
  describe('given default props', () => {
    it('should display the children', () => {
      render(
        <Navigation>
          <NavigationItem key={1} text="Link 1" />,
          <NavigationItem key={2} text="Link 2" />,
        </Navigation>,
      );

      expect(screen.getByText('Link 1')).toBeVisible();
      expect(screen.getByText('Link 2')).toBeVisible();
    });
  });

  describe('given a `className` props', () => {
    it(`should add it to the component's classnames`, () => {
      render(
        <Navigation aria-label="Sub navigation" className="MyNavigation">
          <NavigationItem key={1} text="Link 1" />
        </Navigation>,
      );

      expect(
        screen.getByRole('navigation', { name: 'Sub navigation' }),
      ).toHaveClass('MyNavigation');
    });
  });
});
