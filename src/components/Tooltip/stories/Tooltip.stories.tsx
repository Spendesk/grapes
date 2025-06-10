/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Tooltip } from '../Tooltip';
import { Button } from '../../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  args: {
    content: 'This is some useful information in a tooltip',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primaryBrand" isDisabled text="Top tooltip" />
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: {
    placement: 'bottom',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primaryBrand" isDisabled text="Bottom tooltip" />
    </Tooltip>
  ),
};

export const Left: Story = {
  args: {
    placement: 'left',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primaryBrand" isDisabled text="Left tooltip" />
    </Tooltip>
  ),
};

export const Right: Story = {
  args: {
    placement: 'right',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primaryBrand" isDisabled text="Right tooltip" />
    </Tooltip>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'If the `isDisabled` props is set to `true`, the tooltip will never appear.',
      },
    },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primaryBrand" isDisabled text="Tooltip" />
    </Tooltip>
  ),
};

export const Visible: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'If the `isVisible` props is set to `true`, the tooltip will appear.',
      },
    },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primaryBrand" isDisabled text="Tooltip" />
    </Tooltip>
  ),
};

export const VisibleOnClick: Story = {
  args: {
    content: 'Copied',
  },
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <Tooltip {...args} isOpen={isVisible}>
        <Button
          variant="primaryBrand"
          text="Click to copy"
          onClick={() => {
            setIsVisible(true);
            setTimeout(() => {
              setIsVisible(false);
            }, 2000);
          }}
        />
      </Tooltip>
    );
  },
};

export const TriggerAsChild: Story = {
  args: {
    triggerAsChild: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'To use any as the trigger (the component around which the tooltip will go), a `div` has been added around it. To avoid having this div around the trigger (this can be useful for ellipsis for example), you can use the `triggerAsChild` prop to do so. This will remove the div but you will need to add `forwardRef` to your custom component.',
      },
    },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primaryBrand" text="Trigger as child" />
    </Tooltip>
  ),
};
