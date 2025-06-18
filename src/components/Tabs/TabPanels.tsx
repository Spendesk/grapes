import React, { type ReactNode } from 'react';

type Context = {
  index: number;
};
export const TabPanelsContext = React.createContext<Context | null>(null);

export const useTabPanelsContext = () => {
  const context = React.useContext(TabPanelsContext);
  if (context === null) {
    throw new Error('useTabPanelsContext should be within a TabPanelsContext');
  }

  return context;
};

export type TabPanelsProps = {
  /**
   * The tab panels to display
   */
  children: ReactNode[];
};

export const TabPanels = ({ children }: TabPanelsProps) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <TabPanelsContext.Provider
          value={{
            index,
          }}
        >
          {child}
        </TabPanelsContext.Provider>
      ))}
    </>
  );
};
