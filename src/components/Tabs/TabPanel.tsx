import React from 'react';

import { useTabPanelsContext } from './TabPanels';
import { useTabs, useTabsId } from './Tabs';

export type TabPanelProps = {
  children: React.ReactNode;
};

export const TabPanel = ({ children }: TabPanelProps) => {
  const { index } = useTabPanelsContext();
  const { activeTabIndex } = useTabs();
  const { tabId, tabPanelId } = useTabsId(index);

  return (
    <div
      role="tabpanel"
      id={tabPanelId}
      aria-labelledby={tabId}
      hidden={index !== activeTabIndex}
    >
      {children}
    </div>
  );
};
