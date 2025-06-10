import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CollapsibleList, CollapsibleListItem } from '.';

describe('CollapsibleList', () => {
  describe('given basic props', () => {
    it('should handle onClick', async () => {
      render(
        <CollapsibleList
          renderHeader={(toggle) => (
            <CollapsibleListItem onClick={toggle}>Header 1</CollapsibleListItem>
          )}
        >
          <CollapsibleListItem onClick={vi.fn()}>Item 1</CollapsibleListItem>
        </CollapsibleList>,
      );

      expect(screen.getByRole('list')).not.toBeVisible();

      await userEvent.click(screen.getByText('Header 1'));

      expect(screen.queryByRole('list')).toBeVisible();
    });
  });

  describe('given is not initially collapsed', () => {
    it('should render the component', () => {
      render(
        <CollapsibleList
          isInitialCollapsed={false}
          renderHeader={(toggle) => (
            <CollapsibleListItem onClick={toggle}>Header 1</CollapsibleListItem>
          )}
        >
          <CollapsibleListItem onClick={vi.fn()}>Item 1</CollapsibleListItem>
        </CollapsibleList>,
      );

      expect(screen.getByRole('list')).toBeVisible();
    });
  });

  describe('given a footer prop', () => {
    it('should handle onClick', async () => {
      render(
        <CollapsibleList
          footer={<button type="button">Load more</button>}
          renderHeader={(toggle) => (
            <CollapsibleListItem onClick={toggle}>Header 1</CollapsibleListItem>
          )}
        >
          <CollapsibleListItem onClick={vi.fn()}>Item 1</CollapsibleListItem>
        </CollapsibleList>,
      );

      expect(
        screen.getByRole('button', { name: 'Load more' }),
      ).not.toBeVisible();

      await userEvent.click(screen.getByText('Header 1'));

      expect(screen.queryByRole('button', { name: 'Load more' })).toBeVisible();
    });
  });
});
