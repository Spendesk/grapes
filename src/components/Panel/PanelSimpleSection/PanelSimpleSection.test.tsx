import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PanelSimpleSection } from './';

describe('PanelSimpleSection component', () => {
  describe('given default props', () => {
    it('should render a panel simple section with a title and content', () => {
      render(
        <PanelSimpleSection title="Title">
          <div>Content</div>
        </PanelSimpleSection>,
      );

      expect(screen.getByText('Title')).toBeVisible();
      expect(screen.getByText('Content')).toBeVisible();
    });
  });

  describe('given collapsible props', () => {
    it('should show a title and the content only when opened', async () => {
      const onExtended = vi.fn();
      const onCollapsed = vi.fn();

      render(
        <PanelSimpleSection
          title="Title"
          isCollapsible
          isDefaultCollapsed
          onExtended={onExtended}
          onCollapsed={onCollapsed}
        >
          <div>Content</div>
        </PanelSimpleSection>,
      );

      expect(screen.getByText('Title')).toBeVisible();
      expect(screen.getByText('Content')).not.toBeVisible();

      await userEvent.click(screen.getByText('Title'));

      expect(screen.getByText('Content')).toBeVisible();
      expect(onExtended).toHaveBeenCalled();

      await userEvent.click(screen.getByText('Title'));

      expect(onCollapsed).toHaveBeenCalled();
    });
  });
});
