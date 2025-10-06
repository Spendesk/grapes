import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../index';
import { Callout } from '../../Callout';
import { Icon } from '../../Icon';
import { Tag } from '../../Tag';

import styles from './TabsStories.module.css';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    chromatic: {
      delay: 300,
      diffThreshold: 0.5,
    } /* Size of indicitor is flaky */,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab>Tab One</Tab>
        <Tab>Tab Two</Tab>
        <Tab>Tab Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>First panel</TabPanel>
        <TabPanel>Second panel</TabPanel>
        <TabPanel>Third panel</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const TabsWithDefaultTab: Story = {
  args: {
    defaultTabIndex: 2,
  },
  render: Default.render,
};

export const TabListAtTheBottom: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabPanels>
        <TabPanel>First panel</TabPanel>
        <TabPanel>Second panel</TabPanel>
        <TabPanel>Third panel</TabPanel>
      </TabPanels>
      <TabList>
        <Tab>Tab One</Tab>
        <Tab>Tab Two</Tab>
        <Tab>Tab Three</Tab>
      </TabList>
    </Tabs>
  ),
};

export const TabWithIcon: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab>Tab One</Tab>
        <Tab>Tab Two</Tab>
        <Tab className={styles.gutter}>
          <Icon name="triangle-warning" aria-label="Warning" />
          Tab Three
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>First panel</TabPanel>
        <TabPanel>Second panel</TabPanel>
        <TabPanel>Third panel</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const TabWithTag: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab>Tab One</Tab>
        <Tab>Tab Two</Tab>
        <Tab className={styles.gutter}>
          Tab Three
          <Tag variant="purple">3</Tag>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>First panel</TabPanel>
        <TabPanel>Second panel</TabPanel>
        <TabPanel>Third panel</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const FittedTabs: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList isFitted>
        <Tab>Tab One</Tab>
        <Tab>Tab Two</Tab>
        <Tab>Tab Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>First panel</TabPanel>
        <TabPanel>Second panel</TabPanel>
        <TabPanel>Third panel</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const ControlledTabs: Story = {
  render: (args) => {
    const [value, setValue] = useState(2);
    return (
      <div>
        <Callout
          variant="info"
          title="A tab's state can be controlled. Make sure to include tabIndex and an onChange as well."
        />
        <label htmlFor="indexControl">
          Index
          <input
            id="indexControl"
            type="range"
            min="0"
            max="2"
            step="1"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
        <Tabs {...args} tabIndex={value} onChange={setValue}>
          <TabList>
            <Tab>Tab One</Tab>
            <Tab>Tab Two</Tab>
            <Tab>Tab Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>First panel</TabPanel>
            <TabPanel>Second panel</TabPanel>
            <TabPanel>Third panel</TabPanel>
          </TabPanels>
        </Tabs>
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
      stories={[
        Default,
        TabsWithDefaultTab,
        TabListAtTheBottom,
        TabWithIcon,
        TabWithTag,
        FittedTabs,
        ControlledTabs,
      ]}
      meta={meta}
    />
  ),
};
