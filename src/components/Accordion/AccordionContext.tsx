import React from 'react';

export const AccordionContext = React.createContext<string>('');

export const useAccordion = () => {
  return React.useContext(AccordionContext);
};
