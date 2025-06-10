import React, { useRef } from 'react';
import { classNames } from '../../utils';

import { useTabs, useTabsId } from './Tabs';
import { useTabListContext } from './TabList';

import styles from './Tabs.module.css';

export type TabVariant = 'primary' | 'alert';

export type TabProps = {
  /**
   * The content to display as Tab
   */
  children: React.ReactNode;
  /**
   * className for the element
   */
  className?: string;
};

export const Tab = ({ className, children }: TabProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { activeTabIndex, setActiveTabIndex } = useTabs();
  const { index, onKeyDown, register } = useTabListContext();
  const { tabId, tabPanelId } = useTabsId(index);

  const isActive = activeTabIndex === index;

  register(index, ref);

  return (
    <button
      ref={ref}
      id={tabId}
      type="button"
      role="tab"
      aria-selected={isActive}
      onKeyDown={onKeyDown}
      tabIndex={isActive ? 0 : -1}
      aria-controls={tabPanelId}
      onClick={() => setActiveTabIndex(index)}
      onFocus={() => setActiveTabIndex(index)}
      className={classNames(styles.tab, className)}
    >
      {children}
    </button>
  );
};
