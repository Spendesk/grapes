import React, { ReactNode } from 'react';

type Context = {
  titleId: string;
};
export const PanelContext = React.createContext<Context>({ titleId: '' });

type PanelProviderProps = {
  children: ReactNode;
  titleId: string;
};
export function PanelProvider({
  /**
   * The content of the PanelProvider.
   */
  children,
  /**
   * The Id of the title element for accessibility.
   */
  titleId,
}: PanelProviderProps) {
  return (
    <PanelContext.Provider value={{ titleId }}>
      {children}
    </PanelContext.Provider>
  );
}

export function usePanelContext() {
  const context = React.useContext(PanelContext);
  if (context === null) {
    throw new Error('usePanelContext should be within a PanelProvider');
  }
  return context;
}
