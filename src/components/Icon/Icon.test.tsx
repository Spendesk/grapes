import React from 'react';
import { render, screen } from '@testing-library/react';

import { Icon } from './';

describe('Icon component', () => {
  describe('given default props', () => {
    it('render an icon', () => {
      render(<Icon name="plane" />);
      expect(screen.getByRole('img')).toBeVisible();
    });
  });

  describe('given a className props', () => {
    it('passes the className to the icon', () => {
      render(<Icon name="plane" className="grapes" />);
      expect(screen.getByRole('img')).toHaveClass('grapes');
    });
  });

  describe('given an unknow icon name', () => {
    it('throws', () => {
      expect(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        render(<Icon name="unknown-icon" className="grapes" />),
      ).toThrow('Unknown icon name: unknown-icon');
    });
  });
});
