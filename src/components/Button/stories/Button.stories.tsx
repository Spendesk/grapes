import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Interaction/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryBrand: Story = {
  args: { variant: 'primaryBrand', text: 'Click me' },
};
export const PrimaryInfo: Story = {
  args: { variant: 'primaryInfo', text: 'Click me' },
};
export const PrimarySuccess: Story = {
  args: { variant: 'primarySuccess', text: 'Click me' },
};
export const PrimaryWarning: Story = {
  args: { variant: 'primaryWarning', text: 'Click me' },
};
export const PrimaryAlert: Story = {
  args: { variant: 'primaryAlert', text: 'Click me' },
};
export const SecondaryBrand: Story = {
  args: { variant: 'secondaryBrand', text: 'Click me' },
};
export const SecondaryNeutral: Story = {
  args: { variant: 'secondaryNeutral', text: 'Click me' },
};
export const SecondaryInfo: Story = {
  args: { variant: 'secondaryInfo', text: 'Click me' },
};
export const SecondarySuccess: Story = {
  args: { variant: 'secondarySuccess', text: 'Click me' },
};
export const SecondaryWarning: Story = {
  args: { variant: 'secondaryWarning', text: 'Click me' },
};
export const SecondaryAlert: Story = {
  args: { variant: 'secondaryAlert', text: 'Click me' },
};
export const TertiaryBrand: Story = {
  args: { variant: 'tertiaryBrand', text: 'Click me' },
};
export const TertiaryNeutral: Story = {
  args: { variant: 'tertiaryNeutral', text: 'Click me' },
};
export const TertiaryInfo: Story = {
  args: { variant: 'tertiaryInfo', text: 'Click me' },
};
export const TertiarySuccess: Story = {
  args: { variant: 'tertiarySuccess', text: 'Click me' },
};
export const TertiaryWarning: Story = {
  args: { variant: 'tertiaryWarning', text: 'Click me' },
};
export const TertiaryAlert: Story = {
  args: { variant: 'tertiaryAlert', text: 'Click me' },
};
export const TertiaryComplementary: Story = {
  args: { variant: 'tertiaryComplementary', text: 'Click me' },
};

export const ContentFit: Story = {
  args: {
    ...SecondaryNeutral.args,
    fit: 'content',
  },
};
export const ParentFit: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...SecondaryNeutral.args,
    fit: 'parent',
  },
};
export const WithLeftIcon: Story = {
  args: {
    ...SecondaryNeutral.args,
    iconName: 'chevron-left',
    iconPosition: 'left',
    text: 'Go back',
  },
};
export const WithRightIcon: Story = {
  args: {
    ...SecondaryNeutral.args,
    iconName: 'chevron-right',
    iconPosition: 'right',
    text: 'Continue',
  },
};
export const DisabledPrimary: Story = {
  args: {
    variant: 'primaryBrand',
    isDisabled: true,
    text: `Too bad, you can't click me`,
  },
};
export const DisabledSecondary: Story = {
  args: {
    variant: 'secondaryNeutral',
    isDisabled: true,
    text: `Too bad, you can't click me`,
  },
};
export const DisabledTertiary: Story = {
  args: {
    variant: 'tertiaryNeutral',
    isDisabled: true,
    text: `Too bad, you can't click me`,
  },
};
export const DisabledInsideAFieldset: Story = {
  args: {
    text: `Too bad, you can't click me`,
  },
  render: (args) => (
    <fieldset disabled>
      <Button {...args} variant="primaryBrand" />
    </fieldset>
  ),
};
export const WithAsyncAction: Story = {
  args: {
    ...SecondaryNeutral.args,
    onClick: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 5000);
      });
    },
  },
};
export const UsingHTMLAnchor: Story = {
  args: {
    variant: 'secondaryNeutral',
    component: 'a',
    href: 'https://spendesk.com',
    rel: 'noopener noreferrer',
    target: '_blank',
    text: 'Click me',
  },
};
export const Dropdown: Story = {
  args: { variant: 'tertiaryNeutral', text: 'Filter', isDropdown: true },
};
export const DropdownWithLeftIcon: Story = {
  args: {
    ...Dropdown.args,
    iconName: 'link',
    iconPosition: 'left',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        PrimaryBrand,
        PrimaryInfo,
        PrimarySuccess,
        PrimaryWarning,
        PrimaryAlert,
        SecondaryBrand,
        SecondaryNeutral,
        SecondaryInfo,
        SecondarySuccess,
        SecondaryWarning,
        SecondaryAlert,
        TertiaryBrand,
        TertiaryNeutral,
        TertiaryInfo,
        TertiarySuccess,
        TertiaryWarning,
        TertiaryAlert,
        TertiaryComplementary,
        ContentFit,
        ParentFit,
        WithLeftIcon,
        WithRightIcon,
        DisabledPrimary,
        DisabledSecondary,
        DisabledTertiary,
        DisabledInsideAFieldset,
        DropdownWithLeftIcon,
        Dropdown,
      ]}
      meta={meta}
    />
  ),
};
