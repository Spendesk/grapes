import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { within, userEvent } from 'storybook/test';

import { Button } from '../../Button';
import { DeprecatedModalSlideshow } from '../DeprecatedModalSlideshow';

const slides = [
  {
    title: 'Title slide 1',
    content:
      'This is placeholder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that does not support user tasks.',
    illustration: <img src="images/slide-1.webp" alt="" />,
  },
  {
    title: 'Title slide 2',
    content: 'This is placeholder text.',
    illustration: <img src="images/slide-2.webp" alt="" />,
  },
  {
    title: 'Title slide 3',
    content:
      'This is placeholder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removing unnecessary elements or content that does not support user tasks.',
    illustration: <img src="images/slide-3.webp" alt="" />,
  },
];

const meta: Meta<typeof DeprecatedModalSlideshow> = {
  title: 'Feedback/DeprecatedModalSlideshow',
  component: DeprecatedModalSlideshow,
  args: {
    slides,
    translations: {
      cancel: 'Cancel',
      previous: 'Back',
      next: 'Next',
      done: 'Action wording',
    },
  },
  tags: ['deprecated'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', {
      name: 'Open the modal',
    });
    await userEvent.click(openButton);
  },
  parameters: {
    chromatic: { delay: 300, disableSnapshot: false },
  },
};

export default meta;
type Story = StoryObj<typeof DeprecatedModalSlideshow>;

export const Default: Story = {
  render: (args) => {
    const portalContainer = document.getElementById('storybook-root');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          variant="primaryBrand"
          text="Open the modal"
          onClick={() => setIsOpen(true)}
        />
        <DeprecatedModalSlideshow
          {...args}
          portalContainer={portalContainer || undefined}
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
          onDone={() => setIsOpen(false)}
        />
      </>
    );
  },
};
