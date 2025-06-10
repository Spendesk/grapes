/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { CollapsibleList } from '../CollapsibleList';
import { CollapsibleListItem } from '../CollapsibleListItem';
import { Button } from '../../Button';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof CollapsibleList> = {
  title: 'Data display/CollapsibleList',
  component: CollapsibleList,
  render: (args) => {
    const [activeListItem, setActiveListItem] = useState<number | null>(null);

    return (
      <div className="w-[360px]">
        <CollapsibleList
          {...args}
          renderHeader={(toggle, isCollapsed) => (
            <CollapsibleListItem
              asHeader
              isCollapsed={isCollapsed}
              onClick={toggle}
            >
              Header
            </CollapsibleListItem>
          )}
        >
          <CollapsibleListItem
            isActive={activeListItem === 0}
            onClick={() => setActiveListItem(0)}
          >
            Item 1
          </CollapsibleListItem>
          <CollapsibleListItem
            isActive={activeListItem === 1}
            onClick={() => setActiveListItem(1)}
          >
            Item 2
          </CollapsibleListItem>
        </CollapsibleList>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof CollapsibleList>;

export const Default: Story = {};

export const IsInitiallyOpen: Story = {
  args: {
    isInitialCollapsed: false,
  },
};

export const WithFooter: Story = {
  args: {
    isInitialCollapsed: false,
    footer: (
      <Button
        text="Load more"
        variant="secondaryNeutral"
        onClick={() => console.log('Load more')}
      />
    ),
  },
};

export const WithVariant: Story = {
  args: {
    isInitialCollapsed: false,
  },
  render: (args) => {
    const [activeListItem, setActiveListItem] = useState<number | null>(null);
    return (
      <div className="w-[360px]">
        <CollapsibleList
          {...args}
          renderHeader={(toggle, isCollapsed) => (
            <CollapsibleListItem
              asHeader
              isCollapsed={isCollapsed}
              onClick={toggle}
            >
              Header
            </CollapsibleListItem>
          )}
        >
          <CollapsibleListItem
            variant="alert"
            isActive={activeListItem === 0}
            onClick={() => setActiveListItem(0)}
          >
            Alert
          </CollapsibleListItem>
        </CollapsibleList>
      </div>
    );
  },
};

export const Selectable: Story = {
  args: {
    isInitialCollapsed: false,
  },
  render: (args) => {
    const [activeListItem, setActiveListItem] = useState<number | null>(null);
    const [selectedListItems, setSelectedListItems] = useState<number[]>([]);

    function onSelect(id: number) {
      if (selectedListItems.includes(id)) {
        setSelectedListItems(selectedListItems.filter((item) => item !== id));
      } else {
        setSelectedListItems([...selectedListItems, id]);
      }
    }

    return (
      <div className="w-[360px]">
        <CollapsibleList
          {...args}
          renderHeader={(toggle, isCollapsed) => (
            <CollapsibleListItem
              asHeader
              isCollapsed={isCollapsed}
              isSelected={selectedListItems.length === 3}
              isIndeterminate={
                selectedListItems.length > 0 && selectedListItems.length < 3
              }
              onClick={toggle}
              onSelect={() => {
                if (selectedListItems.length < 3) {
                  setSelectedListItems([0, 1, 2]);
                } else {
                  setSelectedListItems([]);
                }
              }}
            >
              Header
            </CollapsibleListItem>
          )}
        >
          <CollapsibleListItem
            isActive={activeListItem === 0}
            isSelected={selectedListItems.includes(0)}
            onClick={() => setActiveListItem(0)}
            onSelect={() => onSelect(0)}
          >
            Item 1
          </CollapsibleListItem>
          <CollapsibleListItem
            isActive={activeListItem === 1}
            isSelected={selectedListItems.includes(1)}
            onClick={() => setActiveListItem(1)}
            onSelect={() => onSelect(1)}
          >
            Item 2
          </CollapsibleListItem>
          <CollapsibleListItem
            isActive={activeListItem === 2}
            isSelected={selectedListItems.includes(2)}
            onClick={() => setActiveListItem(2)}
            onSelect={() => onSelect(2)}
          >
            Item 3
          </CollapsibleListItem>
        </CollapsibleList>
      </div>
    );
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[Default, IsInitiallyOpen, WithFooter, WithVariant, Selectable]}
      meta={meta}
    />
  ),
};
