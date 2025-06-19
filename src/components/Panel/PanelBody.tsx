import React, { type ReactNode, useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils';

import styles from './Panel.module.css';

export type PanelBodyProps = {
  /**
   * The content to display in the PanelBody.
   */
  children: ReactNode;
  /**
   * className for the element
   */
  className?: string;
};

export function PanelBody({ children, className }: PanelBodyProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const savedRef = panelRef.current;
    const onScroll = () => {
      if ((savedRef?.scrollTop ?? 0) > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };
    if (savedRef) {
      savedRef.addEventListener('scroll', onScroll);
    }
    return () => {
      if (savedRef) {
        savedRef.removeEventListener('scroll', onScroll);
      }
    };
  }, []);
  return (
    <div
      ref={panelRef}
      className={classNames(
        styles.panelBody,
        isScrolling && styles.panelScrolling,
        className,
      )}
    >
      {children}
    </div>
  );
}
