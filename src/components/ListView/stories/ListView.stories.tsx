import type { Meta, StoryObj } from '@storybook/react';
import { ListView } from '../ListView';
import { ListItem } from '../ListItem';
import { SwitchField } from '../../SwitchField';
import React from 'react';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof ListView> = {
  title: 'Data display/ListView',
  component: ListView,
  tags: ['legacy'],
};

export default meta;
type Story = StoryObj<typeof ListView>;

function noop() {
  void 0;
}

export const ManyChildren: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore aria-label is a valid props
    'aria-label': 'Payment methods activation',
    children: [
      <ListItem key="1">
        <SwitchField
          label="Expense claims"
          helpText="Get reimbursed by submitting expense claims"
          isChecked={true}
          onChange={noop}
          fit="parent"
        />
      </ListItem>,
      <ListItem key="2">
        <SwitchField
          label="Purchase orders"
          helpText="Validate orders internally before working with a supplier"
          isChecked={false}
          onChange={noop}
          fit="parent"
        />
      </ListItem>,
      <ListItem key="3">
        <SwitchField
          label="Mileage allowances"
          helpText="Reimburse mileage allowances"
          isChecked={true}
          onChange={noop}
          fit="parent"
        />
      </ListItem>,
    ],
  },
};

export const SingleChild: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore aria-label is a valid props
    'aria-label': 'Payment methods activation',
    children: [
      <ListItem key="1">
        <SwitchField
          label="Expense claims"
          helpText="Get reimbursed by submitting expense claims"
          isChecked={true}
          onChange={noop}
          fit="parent"
        />
      </ListItem>,
    ],
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer stories={[ManyChildren, SingleChild]} meta={meta} />
  ),
};
