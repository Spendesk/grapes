import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CollapsibleListItem } from './CollapsibleListItem';

describe('CollapsibleListItem', () => {
  describe('given basic props', () => {
    const onClick = vi.fn();

    beforeEach(() => {
      render(
        <CollapsibleListItem onClick={onClick}>Item 1</CollapsibleListItem>,
      );
    });

    it('should render the component', () => {
      expect(screen.queryByRole('button')).toBeVisible();
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });

    it('should handle onClick', async () => {
      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('given selectable props', () => {
    const onClick = vi.fn();
    const onSelect = vi.fn();

    beforeEach(() => {
      render(
        <CollapsibleListItem
          isSelected={false}
          onClick={onClick}
          onSelect={onSelect}
        >
          Item 1
        </CollapsibleListItem>,
      );
    });

    it('should render the component', () => {
      expect(screen.queryByRole('checkbox')).toBeVisible();
    });

    it('should handle onSelect', async () => {
      await userEvent.click(screen.getByRole('checkbox'));

      expect(onSelect).toHaveBeenCalled();
    });
  });
});
