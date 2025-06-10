import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithGrapesProvider } from '../../test-utils/renderers';

import { Panel, PanelArea, PanelFooter, SidePanel, SidePanelContent } from './';

describe('Panel component', () => {
  describe('given default props', () => {
    it('should render a panel with a title and content', () => {
      const title = 'Unique Title';
      renderWithGrapesProvider(
        <Panel title={title}>
          <div>Content</div>
        </Panel>,
      );

      expect(screen.getByRole('heading', { name: title })).toBeVisible();
      expect(screen.getByRole('region', { name: title })).toBeVisible();
      expect(screen.getByText('Content')).toBeVisible();
    });
  });

  describe('given a `header` props', () => {
    it('should render a panel with a header', () => {
      renderWithGrapesProvider(
        <Panel title="Title" header={<div>Header</div>}>
          <div>Content</div>
        </Panel>,
      );
      expect(screen.getByRole('banner')).toHaveTextContent('Header');
    });
  });

  describe('given a `footer` props', () => {
    it('should render a panel with a footer', () => {
      renderWithGrapesProvider(
        <Panel title="Title" footer={<div>Footer</div>}>
          <div>Content</div>
        </Panel>,
      );
      expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer');
    });
  });

  describe('given a `className` props', () => {
    it("adds it to the component's classnames", () => {
      renderWithGrapesProvider(
        <Panel title="Title" className="MyPanel">
          <div>Content</div>
        </Panel>,
      );
      expect(screen.getByRole('region', { name: 'Title' })).toHaveClass(
        'MyPanel',
      );
    });
  });

  describe('given `onClose` props', () => {
    it('calls `onClose` when clicking on the onClose button', async () => {
      const handleClose = vi.fn();
      renderWithGrapesProvider(
        <Panel onClose={handleClose}>
          <div>Content</div>
        </Panel>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Close' }));

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('given `aria-labelledby` props', () => {
    it('allows to set a new title', () => {
      const title = 'Unique Title2';
      const titleId = 'panel';
      renderWithGrapesProvider(
        <div>
          <h2 id={titleId}>{title}</h2>
          <Panel title="Panel title" aria-labelledby={titleId}>
            <div>Content</div>
          </Panel>
        </div>,
      );

      expect(screen.getByRole('region', { name: title })).toBeVisible();
    });
  });
});

describe('PanelArea component', () => {
  describe('given default props', () => {
    it('should render the body', () => {
      renderWithGrapesProvider(
        <PanelArea>
          <p>Body</p>
        </PanelArea>,
      );

      expect(screen.getByText('Body')).toBeVisible();
    });
  });
});

describe('PanelFooter component', () => {
  it('should render the body', () => {
    renderWithGrapesProvider(
      <PanelFooter>
        <p>Body</p>
      </PanelFooter>,
    );

    expect(screen.getByText('Body')).toBeVisible();
  });

  it('should render a footer summary', () => {
    renderWithGrapesProvider(
      <PanelFooter
        footerSummary={{
          isCollapsible: false,
          title: 'Footer summary title',
          content: 'Footer summary content',
        }}
      >
        <p>Body</p>
      </PanelFooter>,
    );

    expect(screen.getByText('Body')).toBeVisible();
    expect(screen.getByText('Footer summary title')).toBeVisible();
    expect(screen.getByText('Footer summary content')).toBeVisible();
  });

  it('should render a collapsible footer summary when isCollapsible is set to true', async () => {
    renderWithGrapesProvider(
      <PanelFooter
        footerSummary={{
          isCollapsible: true,
          title: 'Footer summary title',
          content: 'Footer summary content',
        }}
      >
        <p>Body</p>
      </PanelFooter>,
    );

    expect(screen.getByText('Body')).toBeVisible();

    expect(screen.getByRole('group')).toBeVisible();

    // Expect footer summary to be open by default
    expect(screen.getByText('Footer summary title')).toBeVisible();
    expect(screen.getByText('Footer summary content')).toBeVisible();

    await userEvent.click(screen.getByText('Footer summary title'));

    expect(screen.getByText('Footer summary content')).not.toBeVisible();
  });
});

describe('SidePanel', () => {
  it('exposes a SidePanelContent', () => {
    renderWithGrapesProvider(
      <SidePanelContent>
        <p>Content</p>
      </SidePanelContent>,
    );

    expect(screen.getByText('Content')).toBeVisible();
  });

  it('exposes a SidePanelContent', () => {
    const title = 'Unique Title';
    renderWithGrapesProvider(
      <SidePanel title={title}>
        <div>Content</div>
      </SidePanel>,
    );

    expect(screen.getByRole('heading', { name: title })).toBeVisible();
    expect(screen.getByRole('region', { name: title })).toBeVisible();
    expect(screen.getByText('Content')).toBeVisible();
  });
});
