/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { within, userEvent } from 'storybook/test';

import { PageModal } from '../PageModal';
import { Button } from '../../Button';

const meta: Meta<typeof PageModal> = {
  title: 'Feedback/PageModal',
  component: PageModal,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'Open the modal',
    });
    await userEvent.click(openButton);
  },
};

export default meta;
type Story = StoryObj<typeof PageModal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ height: '900px', width: '1200px' }}>
        <Button
          variant="primaryBrand"
          text="Open the modal"
          onClick={() => setIsOpen(true)}
        />
        <PageModal
          {...args}
          title="Page Modal title"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          portalContainer={
            document.getElementById('storybook-root') ?? undefined
          }
        >
          <p style={{ textAlign: 'center' }}>This is a page modal.</p>
        </PageModal>
      </div>
    );
  },
};
