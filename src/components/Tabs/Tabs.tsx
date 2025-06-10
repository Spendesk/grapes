import React from 'react';

import { useId } from '../../hooks/useId';

type Context = {
  prefixId: string;
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
};
export const TabsContext = React.createContext<Context | null>(null);

export const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (context === null) {
    throw new Error('useTabs should be within a TabsContext');
  }
  return context;
};

export const useTabsId = (index: number) => {
  const context = React.useContext(TabsContext);
  if (context === null) {
    throw new Error('useTabs should be within a TabsContext');
  }
  const { prefixId } = context;
  return {
    tabId: `${prefixId}-tab-${index}`,
    tabPanelId: `${prefixId}-tabpanel-${index}`,
  };
};

export type TabsProps = {
  /**
   * The children of the element.
   * Should include TabList and TabPanels elements.
   */
  children: React.ReactNode[];
  /**
   * Returns the active tab's index whenever the user changes tabs
   */
  onChange?: (index: number) => void;
  /**
   * Make a tab initially active.
   * @default 0
   */
  defaultTabIndex?: number;
  /**
   * To control tabs' state
   */
  tabIndex?: number;
};

export const Tabs = ({
  children,
  onChange,
  defaultTabIndex = 0,
  tabIndex,
}: TabsProps) => {
  const prefixId = useId();
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(
    tabIndex ?? defaultTabIndex,
  );

  React.useEffect(() => {
    if (tabIndex !== undefined) {
      setActiveTabIndex(tabIndex);
    }
  }, [tabIndex]);

  React.useEffect(() => {
    if (onChange) {
      onChange(activeTabIndex);
    }
  }, [activeTabIndex, onChange]);

  return (
    <TabsContext.Provider
      value={{
        prefixId,
        activeTabIndex,
        setActiveTabIndex: setActiveTabIndex,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
