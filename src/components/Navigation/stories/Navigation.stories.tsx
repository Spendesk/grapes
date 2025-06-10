/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Navigation } from '../Navigation';
import { NavigationItem } from '../../NavigationItem';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Navigation> = {
  title: 'Navigation/Navigation',
  component: Navigation,
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: (args) => {
    const [activeIndex, setActiveIndex] = useState(1);

    return (
      <Navigation aria-label="MainNavigation" {...args}>
        <NavigationItem
          key="1"
          text="Link 1"
          isActive={activeIndex === 1}
          onClick={() => setActiveIndex(1)}
        />
        <NavigationItem
          key="2"
          text="Link 2"
          isActive={activeIndex === 2}
          onClick={() => setActiveIndex(2)}
        />
        <NavigationItem
          key="3"
          text="Link 3"
          isActive={activeIndex === 3}
          onClick={() => setActiveIndex(3)}
        />
      </Navigation>
    );
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => <SnapshotContainer stories={[Default]} meta={meta} />,
};
