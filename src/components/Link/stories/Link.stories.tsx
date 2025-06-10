import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Callout } from '../../Callout';

import { Link } from '../Link';
import { Anchor } from '../Anchor';

const meta: Meta<typeof Anchor> = {
  title: 'Interaction/Link',
  args: {
    href: 'https://spendesk.com',
    children: 'Click Me',
  },
  component: Anchor,
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Primary: Story = {
  args: { variant: 'primary' },
};
export const Secondary: Story = {
  args: { variant: 'secondary' },
};
export const WithAnExternalLink: Story = {
  args: { variant: 'secondary', isExternal: true },
};
export const InsideACallout: Story = {
  render: () => (
    <Callout
      variant="warning"
      title={
        <p style={{ margin: 0 }}>
          You need to activate cost centers to enable Purchase Orders.{' '}
          <Link href="https://spendesk.com">Activate cost centers</Link>
        </p>
      }
    />
  ),
};
