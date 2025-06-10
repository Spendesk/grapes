import React from 'react';

import { AccordionContext } from './AccordionContext';
import { useId } from '../../hooks/useId';

export type AccordionProps = {
  /**
   * The content of the Accordion, should be AccordionItem(s)
   */
  children: React.ReactNode;
  /**
   * className for the element
   */
  className?: string;
};

export const Accordion = ({ children, className }: AccordionProps) => {
  const name = useId();

  return (
    <div className={className}>
      <AccordionContext.Provider value={name}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};
