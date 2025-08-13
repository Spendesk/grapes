/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { within, userEvent } from 'storybook/test';
import React, { useState } from 'react';

import { Button } from '../../Button';
import { Modal } from '../Modal';
import { Select } from '../../Select';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  args: {
    title: 'Modal Title',
    children:
      'This is placeholder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that do not support user tasks.',
  },
  parameters: {
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    iconName: 'sparkle',
    iconVariant: 'info',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'Open the modal',
    });
    await userEvent.click(openButton);
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button
          variant="primaryBrand"
          text="Open the modal"
          onClick={() => setIsOpen(true)}
        />
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={args.onClose ? () => setIsOpen(false) : undefined}
          portalContainer={
            document.getElementById('storybook-root') ?? undefined
          }
          actions={
            args.actions === null ? undefined : (
              <>
                <Button
                  variant="secondaryNeutral"
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                />
                <Button
                  variant="primaryBrand"
                  text="Switch"
                  onClick={() => setIsOpen(false)}
                />
              </>
            )
          }
        />
      </>
    );
  },
};

export const WithIllustration: Story = {
  args: {
    illustration: <img src="images/illustration-2.webp" alt="" />,
  },
  play: Default.play,
  render: Default.render,
};

export const WithASubtitle: Story = {
  args: {
    ...Default.args,
    subtitle: 'Switch to another accounting tool',
  },
  play: Default.play,
  render: Default.render,
};

export const WithoutButtons: Story = {
  args: {
    illustration: <img src="images/illustration-2.webp" alt="" />,
    noAnimation: true,
    actions: null,
    onClose: () => {
      action('onClose')();
    },
  },
  play: Default.play,
  render: Default.render,
};

const costCenters = [
  { key: 'marketing', label: 'Marketing' },
  { key: 'legal', label: 'Legal' },
  { key: 'office', label: 'Office' },
  { key: 'platform', label: 'Platform' },
  { key: 'finance', label: 'Finance' },
  { key: 'product', label: 'Product' },
  { key: 'engineering', label: 'Engineering' },
];

export const WithDropdownInside: Story = {
  args: {
    iconName: 'sparkle',
    iconVariant: 'info',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'Open the modal',
    });
    await userEvent.click(openButton);
    const dropdown = await canvas.findByRole(
      'button',
      {
        name: 'Show options',
      },
      { timeout: 1000 },
    );

    await userEvent.click(dropdown);
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button
          variant="primaryBrand"
          text="Open the modal"
          onClick={() => setIsOpen(true)}
        />
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={args.onClose ? () => setIsOpen(false) : undefined}
          portalContainer={
            document.getElementById('storybook-root') ?? undefined
          }
          actions={
            args.actions === null ? undefined : (
              <>
                <Button
                  variant="primaryBrand"
                  text="Ok"
                  onClick={() => setIsOpen(false)}
                />
              </>
            )
          }
        >
          <div
            style={{
              padding: '16px',
              minWidth: '400px',
            }}
          >
            <Select
              value={undefined}
              onSelect={action('onSelect')}
              options={costCenters}
            />
          </div>
        </Modal>
      </>
    );
  },
};
