import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { within, userEvent } from 'storybook/test';

import { Button } from '../../Button';
import { ModalSlideshow } from '../ModalSlideshow';

const slides = [
  {
    title: 'Check request details',
    content: (
      <p>
        You will have the request details needed for approval. Once approved,
        the requester will be notified and can generate a dedicated virtual card
        for the purchase.
      </p>
    ),
    illustration: (
      <img src=".storybook/assets/images/illustration-slide-1.webp" alt="" />
    ),
  },
  {
    title: 'What is a valid receipt',
    content: (
      <>
        <p>
          A receipt or a proof of purchase is a document provided by the
          merchant as record of your purchase of goods or services. A valid
          receipt must contain the following info:
        </p>
        <ol>
          <li>The date of purchase</li>
          <li>The name and address of the supplier</li>
          <li>
            A description of the items purchased, including individual prices
            and quantities
          </li>
          <li>The VAT if applicable</li>
          <li>The total price</li>
        </ol>
      </>
    ),
    illustration: (
      <img src=".storybook/assets/images/illustration-slide-2.webp" alt="" />
    ),
  },
  {
    title: 'Four ways to upload',
    content: (
      <>
        <p>
          This is where the description of the slide goes. The goal is to
          explain your message as succinctly as possible. And preferably in
          three lines if you use this variant.
        </p>
        <h3 className="title-m"> 1. With the Spendesk mobile app</h3>
        <p>
          Download the mobile app to your phone and snap a picture of your
          receipt directly into your account.
        </p>
        <h3 className="title-m">2. On the Spendesk website</h3>
        <p>
          Drag and drop your receipt to the related payment from your desktop.
        </p>
        <h3 className="title-m">3. By email reply</h3>
        <p>
          Replay to the payment confirmation email with your email attached.
        </p>
        <h3 className="title-m">4. By email forward</h3>
        <p>
          Forward your receipt to receipts+[yourcompanyid]@spendesk.com. List
          content 5 Description of content
        </p>
      </>
    ),
    illustration: (
      <img src=".storybook/assets/images/illustration-slide-3.webp" alt="" />
    ),
  },
];

const meta: Meta<typeof ModalSlideshow> = {
  title: 'Feedback/ModalSlideshow',
  component: ModalSlideshow,
  args: {
    slides,
    translations: {
      cancel: 'Cancel',
      previous: 'Back',
      next: 'Next',
      done: 'Action wording',
    },
  },
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
type Story = StoryObj<typeof ModalSlideshow>;

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
        <ModalSlideshow
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
