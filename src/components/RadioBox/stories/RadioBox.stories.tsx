import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import React from 'react';

import { RadioBox } from '..';
import { RadioGroup } from '../../RadioGroup';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof RadioBox> = {
  title: 'Form/RadioBox',
  component: RadioBox,
  args: {
    label: 'RadioBox Label',
    value: 'daily',
    description:
      'This is the description of the RadioBox which helps to add some info and context to our users.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioBox>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup
      name="default"
      value=""
      onChange={(e) => {
        action('onChange RadioGroup')(e);
      }}
    >
      <RadioBox {...args} />
    </RadioGroup>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <RadioGroup
      name="checked"
      value="daily"
      onChange={(e) => {
        action('onChange RadioGroup')(e);
      }}
    >
      <RadioBox {...args} />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup
      name="Disabled"
      value=""
      onChange={(e) => {
        action('onChange RadioGroup')(e);
      }}
    >
      <RadioBox {...args} />
    </RadioGroup>
  ),
  args: {
    isDisabled: true,
  },
};

export const DisabledAndChecked: Story = {
  render: (args) => (
    <RadioGroup
      name="DisabledAndChecked"
      value="daily"
      onChange={(e) => {
        action('onChange RadioGroup')(e);
      }}
    >
      <RadioBox {...args} />
    </RadioGroup>
  ),
  args: {
    isDisabled: true,
  },
};

export const WithoutDescription: Story = {
  render: (args) => (
    <RadioGroup
      name="WithoutDescription"
      value=""
      onChange={(e) => {
        action('onChange RadioGroup')(e);
      }}
    >
      <RadioBox {...args} />
    </RadioGroup>
  ),
  args: {
    description: null,
  },
};

export const WithIcon: Story = {
  args: {
    iconName: 'calendar',
  },
  render: (args) => (
    <RadioGroup
      name="WithIcon"
      value=""
      onChange={(e) => {
        action('onChange RadioGroup')(e);
      }}
    >
      <RadioBox {...args} />
    </RadioGroup>
  ),
};

export const WithIconWithoutDescription: Story = {
  args: {
    iconName: 'calendar',
    description: null,
  },
  render: (args) => (
    <RadioGroup
      name="WithIconWithoutDescription"
      value=""
      direction="column"
      onChange={(e) => {
        action('onChange RadioGroup')(e);
      }}
    >
      <RadioBox {...args} />
    </RadioGroup>
  ),
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        Checked,
        Disabled,
        DisabledAndChecked,
        WithoutDescription,
        WithIcon,
        WithIconWithoutDescription,
      ]}
      meta={meta}
    />
  ),
};
