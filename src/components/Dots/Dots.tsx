import React from 'react';

import styles from './Dots.module.scss';

export type DotsProps = {
  /**
   * className for the element
   */
  className?: string;
  /**
   * Index of the active dot
   */
  activeDotIndex: number;
  /**
   * Number of dot to display
   */
  length: number;
};

export const Dots = ({ activeDotIndex, length }: DotsProps) => {
  return (
    <ul className={styles.list} aria-hidden={true}>
      {Array.from({ length }, (_, i) => i).map((index) => (
        <li key={index} data-active={index === activeDotIndex}></li>
      ))}
    </ul>
  );
};
