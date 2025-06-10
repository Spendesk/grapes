import React from 'react';
import { render, screen } from '@testing-library/react';

import { PanelSection } from './';

describe('PanelSection component', () => {
  describe('given default props and editable', () => {
    it('should render an editable panel section', () => {
      render(
        <PanelSection
          title="Title"
          isEditable
          editSection={<div>Edit</div>}
          cancelTranslation="Cancel"
          saveTranslation="Save changes"
          onSave={() => console.log('on save')}
          onCancel={() => console.log('on cancel')}
          editButtonLabel="Edit me"
        >
          <div>Content</div>
        </PanelSection>,
      );

      // Check if edit button is present
      expect(screen.getByRole('button', { name: 'Edit me' })).toBeVisible();
    });
  });

  describe('given default props and not editable', () => {
    it('should render a simple panel section', () => {
      render(
        <PanelSection title="Title">
          <div>Content</div>
        </PanelSection>,
      );

      // Check that edit button is not there
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
