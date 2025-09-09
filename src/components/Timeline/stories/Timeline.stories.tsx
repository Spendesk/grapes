import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Tag } from '../../Tag';
import { Timeline } from '../Timeline';
import { TimelineItem } from '../TimelineItem';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Timeline> = {
  title: 'Data display/Timeline',
  component: Timeline,
  tags: ['legacy'],
  args: {
    children: (
      <>
        <TimelineItem date={new Date('2020-12-22T22:29:00')}>
          <section>
            <div>New request created</div>
            <div>Submitted by Roger Dupont</div>
            <div>Amount requested: 39€</div>
          </section>
        </TimelineItem>
        <TimelineItem date={new Date('2021-01-05T15:29:00')}>
          <section>
            <div>Approved by manager</div>
            <div>Approver: Jean</div>
          </section>
        </TimelineItem>
        <TimelineItem date={new Date('2021-01-08T09:24:00')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Tag variant="success" iconName="circle-check">
              Validated
            </Tag>
            by
            <Tag variant="carbon">Finance Team</Tag>
          </div>
        </TimelineItem>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {};

export const WithCustomRenderDate: Story = {
  args: {
    renderDate: (date, locale) => date.toLocaleString(locale),
  },
};

export const ParentFit: Story = {
  args: {
    renderDate: (date, locale) => date.toLocaleString(locale),
    fit: 'parent',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Default, WithCustomRenderDate, ParentFit]}
      meta={meta}
    />
  ),
};
