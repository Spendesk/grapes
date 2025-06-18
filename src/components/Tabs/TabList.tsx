import React, { type ReactNode, useRef } from 'react';
import { useId } from '../../hooks/useId';
import { classNames } from '../../utils';

import { useTabs } from './Tabs';

import styles from './Tabs.module.css';

type Context = {
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  index: number;
  register: (index: number, ref: TabRef) => void;
};
export const TabListContext = React.createContext<Context | null>(null);

export const useTabListContext = () => {
  const context = React.useContext(TabListContext);
  if (context === null) {
    throw new Error('useTabListContext should be within a TabListContext');
  }

  return context;
};

export type TabRef = React.MutableRefObject<HTMLButtonElement | null>;

export type TabListProps = {
  /**
   * The Tab items to display
   */
  children: ReactNode[];
  /**
   * Whether the TabList should fit the container
   * @default false
   */
  isFitted?: boolean;
  /**
   * className for the element
   */
  className?: string;
};

export const TabList = ({ children, isFitted, className }: TabListProps) => {
  const { activeTabIndex } = useTabs();
  const tablistId = useId();
  const tabMapRef = useRef<TabRef[]>([]);
  const descendants = React.Children.count(children);

  function register(index: number, ref: TabRef) {
    tabMapRef.current[index] = ref;
  }

  // Only used for keyboard navigation
  function focusNewTab(newIndex: number) {
    const newCurrentTabRef = tabMapRef.current[newIndex];
    if (newCurrentTabRef) {
      newCurrentTabRef.current?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'Home':
        focusNewTab(0);
        break;
      case 'End':
        focusNewTab(descendants - 1);
        break;
      case 'ArrowLeft':
        focusNewTab((activeTabIndex - 1 + descendants) % descendants);
        break;
      case 'ArrowRight':
        focusNewTab((activeTabIndex + 1) % descendants);
        break;
    }
  }

  return (
    <div
      className={classNames(styles.tabList, className)}
      role="tablist"
      id={tablistId}
      style={{ ['--_tab-grow' as string]: isFitted ? '1' : '0' }}
    >
      {React.Children.map(children, (child, index) => (
        <TabListContext.Provider
          value={{
            onKeyDown: handleKeyDown,
            index,
            register,
          }}
        >
          {child}
        </TabListContext.Provider>
      ))}
      <TabIndicator activeTabIndex={activeTabIndex} containerId={tablistId} />
    </div>
  );
};

type TabIndicatorProps = {
  activeTabIndex: number;
  containerId: string;
};

type StyleState = {
  '--_size-indicator': string;
  '--_offset-indicator': string;
};
function TabIndicator({ activeTabIndex, containerId }: TabIndicatorProps) {
  const [style, setStyle] = React.useState<StyleState>({
    '--_size-indicator': '',
    '--_offset-indicator': '',
  });

  React.useLayoutEffect(() => {
    const container = document.getElementById(containerId);
    const selectedTab = container?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    if (selectedTab) {
      setStyle({
        '--_offset-indicator': `${selectedTab.offsetLeft}px`,
        '--_size-indicator': `${selectedTab.offsetWidth}px`,
      });
    }
  }, [activeTabIndex, containerId]);

  return (
    <div
      role="presentation"
      className={styles.indicator}
      style={style as Record<string, string>}
    />
  );
}
