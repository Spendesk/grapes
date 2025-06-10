import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { Panel } from '../Panel';
import { PanelSection } from '../PanelSection';
import { Callout } from '../../Callout';
import { Input } from '../../Input';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Panel> = {
  title: 'Data display/Panel',
  component: Panel,
  args: {
    title: 'Panel',
    children: <div style={{ height: '200px' }}>Content</div>,
    onClose: (e) => {
      action('onClose')(e);
    },
  },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {};

export const SidePanel: Story = {
  args: {
    DO_NOT_USE_isSidePanel: true,
    title: 'Panel with header',
    header: <div>Header</div>,
    footer: <div>Footer</div>,
    children: (
      <>
        <PanelSection title="Collapsible section" isCollapsible>
          <div style={{ paddingTop: '24px' }}>
            This is a collapsible section.
          </div>
        </PanelSection>
        <div className="mt-auto">I should be at the bottom near the footer</div>
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    title: 'Panel with header',
    header: <div>Header</div>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Panel with footer',
    footer: <div>Footer</div>,
  },
};

export const WithFooterSummary: Story = {
  args: {
    title: 'Panel with footer summary',
    footerSummary: {
      isCollapsible: true,
      title: 'This section is a collapsible footer section',
      content: (
        <div style={{ paddingTop: '24px' }}>
          This is a collapsible footer content.
        </div>
      ),
    },
  },
};

export const WithFooterSummaryAndFooter: Story = {
  args: {
    title: 'Panel with footer summmary and footer',
    footerSummary: {
      isCollapsible: true,
      title: 'This section is a collapsible footer section',
      content: (
        <div style={{ paddingTop: '24px' }}>
          This is a collapsible footer content.
        </div>
      ),
    },
    footer: <div>Footer</div>,
  },
};

export const WithNonCollapsibleFooterAccordionAndFooter: Story = {
  args: {
    title: 'Panel with non collapsible footer',
    footerSummary: {
      isCollapsible: false,
      title: 'This section is a non-collapsible footer section',
      content: (
        <div style={{ marginTop: '24px' }}>
          This is a footer summary content.
        </div>
      ),
    },
    footer: <div>Footer</div>,
  },
};

export const WithEditablePanelSection: Story = {
  args: {
    title: 'Panel with editable panel section',
    children: (
      <PanelSection
        title="Editable section"
        isEditable
        editSection={
          <div>
            <p>This section is being edited.</p>
            <div style={{ paddingTop: '16px' }}>
              <Input fit="parent" />
            </div>
          </div>
        }
        cancelTranslation="Cancel"
        saveTranslation="Save changes"
        onSave={() => {
          action('onSave')();
        }}
        onCancel={() => {
          action('onCancel')();
        }}
      >
        This is an editable section
      </PanelSection>
    ),
  },
};

export const WithEditablePanelSectionAndErrorHandling: Story = {
  args: {
    title: 'Panel with editable panel section and error handling',
    children: (
      <PanelSection
        title="Editable section"
        isEditable
        editSection={
          <div>
            <p>This section will throw an error when edited.</p>
            <div style={{ paddingTop: '16px' }}>
              <Input fit="parent" />
            </div>
          </div>
        }
        cancelTranslation="Cancel"
        saveTranslation="Save changes"
        renderError={() => (
          <div style={{ paddingTop: '16px' }}>
            <Callout variant="alert" title="An error occured" />
          </div>
        )}
        onSave={() => {
          throw new Error('error');
        }}
        onCancel={() => {
          action('onCancel')();
        }}
      >
        This is an editable section throwing an error when edited.
      </PanelSection>
    ),
  },
};

export const WithEditablePanelSectionAndSaveDisabled: Story = {
  args: {
    title: 'Panel with editable panel and save disabled',
    children: (
      <PanelSection
        title="Editable section"
        isEditable
        editSection={
          <div>
            <p>
              This section is being edited but the save changes button is
              disabled.
            </p>
            <div style={{ paddingTop: '16px' }}>
              <Input fit="parent" />
            </div>
          </div>
        }
        cancelTranslation="Cancel"
        saveTranslation="Save changes"
        disableSave
        onSave={() => {
          action('onSave')();
        }}
        onCancel={() => {
          action('onCancel')();
        }}
      >
        This is an editable section but the save changes button will be
        disabled.
      </PanelSection>
    ),
  },
};

export const WithCollapsiblePanelSection: Story = {
  args: {
    title: 'Panel with collapsisble panel section',
    children: (
      <PanelSection title="Collapsible section" isCollapsible>
        <div style={{ paddingTop: '24px' }}>This is a collapsible section.</div>
      </PanelSection>
    ),
  },
};

/* This stories is to make sure null & components who render null do not create multiple separator */
export const WithMultiplePanelSections: Story = {
  render: (args) => {
    const ComponentRenderingNull = () => {
      const checkNull = true;
      if (checkNull) return null;
      return <span></span>;
    };
    return (
      <Panel {...args} title="Panel with multiple sections">
        <PanelSection title="Section 1" isCollapsible>
          <div style={{ paddingTop: '24px' }}>This is the first section.</div>
        </PanelSection>
        {null}
        <ComponentRenderingNull />
        <ComponentRenderingNull />
        {null}
        <ComponentRenderingNull />
        <ComponentRenderingNull />
        <PanelSection title="Section 2">
          <div style={{ marginTop: '24px' }}>This is the second section.</div>
        </PanelSection>
        {null}
        <ComponentRenderingNull />
        <ComponentRenderingNull />
        <PanelSection title="Section 3" isCollapsible>
          <div style={{ paddingTop: '24px' }}>
            This is the third and final section.
          </div>
        </PanelSection>
        {null}
        <ComponentRenderingNull />
      </Panel>
    );
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        WithHeader,
        WithFooter,
        WithFooterSummary,
        WithFooterSummaryAndFooter,
        WithNonCollapsibleFooterAccordionAndFooter,
        WithEditablePanelSection,
        WithEditablePanelSectionAndErrorHandling,
        WithEditablePanelSectionAndSaveDisabled,
        WithCollapsiblePanelSection,
        WithMultiplePanelSections,
      ]}
      meta={meta}
    />
  ),
};
