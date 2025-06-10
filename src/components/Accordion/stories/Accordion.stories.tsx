import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Accordion> = {
  title: 'Navigation/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem renderHeader={() => <div>Invite team members</div>}>
        <div
          style={{
            padding:
              'var(--unit-8) var(--unit-24) var(--unit-24) var(--unit-24)',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          lectus sed sem porttitor viverra. Vestibulum magna leo.
        </div>
      </AccordionItem>
      <AccordionItem renderHeader={() => <div>Make a first payment</div>}>
        <div
          style={{
            padding:
              'var(--unit-8) var(--unit-24) var(--unit-24) var(--unit-24)',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          lectus sed sem porttitor viverra. Vestibulum magna leo.
        </div>
      </AccordionItem>
      <AccordionItem renderHeader={() => <div>Order physical cards</div>}>
        <div
          style={{
            padding:
              'var(--unit-8) var(--unit-24) var(--unit-24) var(--unit-24)',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          lectus sed sem porttitor viverra. Vestibulum magna leo.
        </div>
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  args: {},
  render: () => {
    return (
      <Accordion>
        <AccordionItem open renderHeader={() => <div>Invite team members</div>}>
          <div
            style={{
              padding:
                'var(--unit-8) var(--unit-24) var(--unit-24) var(--unit-24)',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            lectus sed sem porttitor viverra. Vestibulum magna leo.
          </div>
        </AccordionItem>
        <AccordionItem renderHeader={() => <div>Make a first payment</div>}>
          <div
            style={{
              padding:
                'var(--unit-8) var(--unit-24) var(--unit-24) var(--unit-24)',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            lectus sed sem porttitor viverra. Vestibulum magna leo.
          </div>
        </AccordionItem>
        <AccordionItem renderHeader={() => <div>Order physical cards</div>}>
          <div
            style={{
              padding:
                'var(--unit-8) var(--unit-24) var(--unit-24) var(--unit-24)',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            lectus sed sem porttitor viverra. Vestibulum magna leo.
          </div>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const SingleItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem renderHeader={() => <div>Invite team members</div>}>
        <div
          style={{
            padding:
              'var(--unit-8) var(--unit-24) var(--unit-24) var(--unit-24)',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          lectus sed sem porttitor viverra. Vestibulum magna leo.
        </div>
      </AccordionItem>
    </Accordion>
  ),
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Default, DefaultOpen, SingleItem]}
      meta={meta}
    />
  ),
};
