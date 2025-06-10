import React from 'react';

import { render, screen } from '@testing-library/react';
import { Badge } from './';

describe('Badge component', () => {
  describe('given default props', () => {
    it('should display the content of the badge', () => {
      render(<Badge>12</Badge>);

      expect(screen.getByText('12')).toBeVisible();
    });
  });

  describe('given a `className` props', () => {
    it("adds it to the component's classnames", () => {
      render(
        <Badge className="MyBadge" variant="secondary">
          12
        </Badge>,
      );
      expect(screen.getByText('12')).toHaveClass('MyBadge');
    });
  });
});
