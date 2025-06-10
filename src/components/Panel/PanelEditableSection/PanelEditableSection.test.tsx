import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PanelEditableSection } from './';
import { Callout } from '../../Callout';
import { GrapesProvider } from '../../GrapesProvider/GrapesProvider';
import { LOCALES } from '../../GrapesProvider/exampleLocales';

describe('PanelEditableSection component', () => {
  describe('given default props and not in edit mode', () => {
    it('should render a panel editable section with a title and content', () => {
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <PanelEditableSection
            title="Title"
            editSection={<div>Edit</div>}
            cancelTranslation="Cancel"
            saveTranslation="Save changes"
            onSave={() => console.log('on save')}
            onCancel={() => console.log('on cancel')}
          >
            <div>Content</div>
          </PanelEditableSection>
        </GrapesProvider>,
      );

      expect(screen.getByText('Title')).toBeVisible();
      expect(screen.getByText('Content')).toBeVisible();
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });
  });

  describe('given default props and in edit mode', () => {
    it('should render a panel editable section with a title and content', async () => {
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <PanelEditableSection
            title="Title"
            editSection={<div>Edit</div>}
            cancelTranslation="Cancel"
            saveTranslation="Save changes"
            onSave={() => console.log('on save')}
            onCancel={() => console.log('on cancel')}
          >
            <div>Content</div>
          </PanelEditableSection>
        </GrapesProvider>,
      );

      // Click on edit button to start edit mode
      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByText('Title')).toBeVisible();
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeVisible();
    });
  });

  describe('given `onSave` props', () => {
    it('calls `onSave` when clicking on the onSave button', async () => {
      const handleSave = vi.fn();
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <PanelEditableSection
            title="Title"
            editSection={<div>Edit</div>}
            cancelTranslation="Cancel"
            saveTranslation="Save changes"
            onSave={handleSave}
            onCancel={() => console.log('on cancel')}
          >
            <div>Content</div>
          </PanelEditableSection>
        </GrapesProvider>,
      );

      // Click on edit button to start edit mode
      await userEvent.click(screen.getByRole('button'));

      // Click on Save changes
      await userEvent.click(
        screen.getByRole('button', { name: 'Save changes' }),
      );

      expect(handleSave).toHaveBeenCalledTimes(1);
    });
  });

  describe('given `onCancel` props', () => {
    it('calls `onCancel` when clicking on the onCancel button', async () => {
      const handleCancel = vi.fn();
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <PanelEditableSection
            title="Title"
            editSection={<div>Edit</div>}
            cancelTranslation="Cancel"
            saveTranslation="Save changes"
            onSave={() => console.log('on save')}
            onCancel={handleCancel}
          >
            <div>Content</div>
          </PanelEditableSection>
        </GrapesProvider>,
      );

      // Click on edit button to start edit mode
      await userEvent.click(screen.getByRole('button'));

      // Click on Cancel
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(handleCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('given `disableSave` props', () => {
    it('does not call `onSave` when clicking on the onSave button', async () => {
      const handleSave = vi.fn();
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <PanelEditableSection
            title="Title"
            editSection={<div>Edit</div>}
            cancelTranslation="Cancel"
            saveTranslation="Save changes"
            disableSave
            onSave={handleSave}
            onCancel={() => console.log('on cancel')}
          >
            <div>Content</div>
          </PanelEditableSection>
        </GrapesProvider>,
      );

      // Click on edit button to start edit mode
      await userEvent.click(screen.getByRole('button'));

      // Click on Save changes
      await userEvent.click(
        screen.getByRole('button', { name: 'Save changes' }),
      );

      expect(handleSave).not.toHaveBeenCalled();
    });
  });

  describe('given `renderError`, `onError` props', () => {
    it('calls `renderError`, `onError` when an error occurs', async () => {
      const onError = vi.fn();
      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <PanelEditableSection
            title="Title"
            editSection={<div>Edit</div>}
            cancelTranslation="Cancel"
            saveTranslation="Save changes"
            renderError={() => (
              <Callout variant="alert" title="An error occured" />
            )}
            onError={onError}
            onSave={() => {
              throw new Error('error');
            }}
            onCancel={() => console.log('on cancel')}
          >
            <div>Content</div>
          </PanelEditableSection>
        </GrapesProvider>,
      );

      // Click on edit button to start edit mode
      await userEvent.click(screen.getByRole('button'));

      // Click on Save changes
      await userEvent.click(
        screen.getByRole('button', { name: 'Save changes' }),
      );

      expect(screen.getByRole('complementary')).toHaveTextContent(
        'An error occured',
      );
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });
});
